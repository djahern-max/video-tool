/**
 * The course record for ASC842-PCX and the four-lesson outline.
 *
 * Course-level metadata lives here once; lesson modules import these fields
 * into their `meta` rather than repeating them, so the course cannot drift
 * across lessons. superCPE feature 004 formalizes the course side.
 *
 * `knowledgeLevel` uses the contract's spelling ("Intermediate", 3.01.1) —
 * the manifest validator rejects any other casing.
 */

export const COURSE = {
  courseCode: "ASC842-PCX",
  title: "ASC 842 for Private Companies: The Practical Expedients",
  nasbaFieldOfStudy: "Accounting",
  knowledgeLevel: "Intermediate",
  prerequisites:
    "Basic familiarity with ASC 842: identifying a lease, classifying it, " +
    "and recognizing a right-of-use asset and lease liability.",
  advancePreparation: "None",
  deliveryMethod: "Self study",
  lessons: [
    {
      position: 1,
      lessonId: "ASC842-PCX-01",
      title: "The Short-Term Lease Exception",
      status: "draft",
    },
    {
      position: 2,
      lessonId: "ASC842-PCX-02",
      title: "The Risk-Free Rate Election",
      status: "planned",
    },
    {
      position: 3,
      lessonId: "ASC842-PCX-03",
      title: "Not Separating Lease and Nonlease Components",
      status: "planned",
    },
    {
      position: 4,
      lessonId: "ASC842-PCX-04",
      title: "Common Control Arrangements",
      status: "planned",
    },
  ],
} as const;
