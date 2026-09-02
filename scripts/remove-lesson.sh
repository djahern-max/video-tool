#!/usr/bin/env bash
#
# remove-lesson.sh — delete a lesson and unwire it from the registries.
#
#   ./scripts/remove-lesson.sh list              what exists, and what it is
#   ./scripts/remove-lesson.sh 99                dry run: show the plan
#   ./scripts/remove-lesson.sh --apply 99 06     do it
#
# Dry run is the default. --apply is required to touch anything.
# Refuses a lesson whose meta.status is "reviewed" unless --allow-reviewed.
# Refuses to run on a dirty git tree, so `git checkout .` is always your undo.

set -euo pipefail

APPLY=0
ALLOW_REVIEWED=0
SKIP_GIT_CHECK=0
IDS=()

for arg in "$@"; do
  case "$arg" in
    --apply)          APPLY=1 ;;
    --allow-reviewed) ALLOW_REVIEWED=1 ;;
    --no-git-check)   SKIP_GIT_CHECK=1 ;;
    list)             IDS=("__list__") ;;
    -h|--help)        sed -n '2,12p' "$0"; exit 0 ;;
    -*)               echo "unknown flag: $arg" >&2; exit 2 ;;
    *)                IDS+=("$arg") ;;
  esac
done

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"

field() {  # field <file> <key>  -> the quoted value, or ""
  { grep -oE "$2: *\"[^\"]*\"" "$1" 2>/dev/null || true; } | head -1 | sed 's/.*"\(.*\)"/\1/'
}

describe() {
  local id="$1" f="src/lesson-$id.ts"
  [ -f "$f" ] || { printf '  %-4s (no module)\n' "$id"; return; }
  local status kind code mp3s guide qs
  status=$(field "$f" status); kind=$(field "$f" kind); code=$(field "$f" courseCode)
  mp3s=$(find "public/audio/$id" -name '*.mp3' 2>/dev/null | wc -l | tr -d ' ')
  guide=$([ -d "guide/$id" ] && echo yes || echo no)
  qs=$({ grep -c '"stem"' "src/questions-$id.json" 2>/dev/null || true; } | head -1)
  printf '  %-4s status=%-9s kind=%-6s course=%-16s mp3=%-3s guide=%-4s questions=%s\n' \
    "$id" "${status:-?}" "${kind:-video}" "${code:-?}" "$mp3s" "$guide" "$qs"
  for d in drafts/*"$code"*; do
    [ -e "$d" ] && printf '       review document: %s\n' "$d" || true
  done
}

if [ "${IDS[0]:-}" = "__list__" ] || [ ${#IDS[@]} -eq 0 ]; then
  echo "Lessons in this repo:"
  set +e   # describe() is informational; a missing dir must not abort the listing
  for f in src/lesson-*.ts; do
    id="${f#src/lesson-}"; id="${id%.ts}"
    describe "$id"
  done
  set -e
  echo
  echo "Then: ./scripts/remove-lesson.sh <id> [<id>...]   (dry run)"
  exit 0
fi

# ---- safety gates -----------------------------------------------------

if [ "$SKIP_GIT_CHECK" -eq 0 ] && [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  echo "Working tree is dirty. Commit or stash first, so 'git checkout .' can undo this."
  echo "(--no-git-check to override)"
  exit 1
fi

for id in "${IDS[@]}"; do
  [ -f "src/lesson-$id.ts" ] || { echo "no such lesson: $id"; exit 1; }
  st=$(field "src/lesson-$id.ts" status)
  if [ "$st" = "reviewed" ] && [ "$ALLOW_REVIEWED" -eq 0 ]; then
    echo "REFUSED: lesson $id is status \"reviewed\" — a CPA signed this off (4.01.1, 4.02)."
    echo "It is not a test video. Pass --allow-reviewed if you really mean it."
    exit 1
  fi
done

# ---- plan -------------------------------------------------------------

REGISTRIES="src/lessons.ts src/questions.ts src/course.ts"
manual_hits=0

echo "Lessons to remove: ${IDS[*]}"
echo
echo "Files and directories:"
for id in "${IDS[@]}"; do
  for p in "src/lesson-$id.ts" "src/questions-$id.json" "src/audio-meta-$id.json" \
           "public/audio/$id" "guide/$id"; do
    [ -e "$p" ] && echo "  rm  $p"
  done
done

echo
echo "Registry lines:"
for id in "${IDS[@]}"; do
  pat="lesson-$id|questions-$id|audio-meta-$id|lesson$id|questions$id|\"$id\""
  for reg in $REGISTRIES; do
    [ -f "$reg" ] || continue
    while IFS= read -r line; do
      n="${line%%:*}"; text="${line#*:}"
      # A line naming a whole union type or several ids is edited by hand,
      # never auto-deleted: dropping it would take the other lessons with it.
      if printf '%s' "$text" | grep -qE 'LessonId *=|\|'; then
        echo "  MANUAL  $reg:$n  $text"
        manual_hits=1
      else
        echo "  strip   $reg:$n  $text"
      fi
    done < <(grep -nE "$pat" "$reg" || true)
  done
done

if [ "$APPLY" -eq 0 ]; then
  echo
  echo "Dry run. Re-run with --apply to do it."
  exit 0
fi

# ---- apply ------------------------------------------------------------

echo
for id in "${IDS[@]}"; do
  for p in "src/lesson-$id.ts" "src/questions-$id.json" "src/audio-meta-$id.json" \
           "public/audio/$id" "guide/$id"; do
    [ -e "$p" ] && rm -rf "$p" && echo "removed $p"
  done
  pat="lesson-$id|questions-$id|audio-meta-$id|lesson$id|questions$id|\"$id\""
  for reg in $REGISTRIES; do
    [ -f "$reg" ] || continue
    perl -ni -e "print unless /$pat/ && !/LessonId *=|\|/" "$reg"
  done
done
echo "registries stripped"

# ---- report -----------------------------------------------------------

echo
echo "Leftover mentions (edit these by hand):"
left=0
for id in "${IDS[@]}"; do
  if grep -rnE "lesson-$id|questions-$id|audio-meta-$id|\"$id\"" src guide 2>/dev/null; then
    left=1
  fi
done
[ "$left" -eq 0 ] && echo "  none"

echo
echo "Now run:  npm run typecheck && npm run check"
echo "Undo:     git checkout . && git clean -fd"
