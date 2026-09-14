# GPT — source index

Working title of the course: "Using ChatGPT in an Accounting Practice".
Computer Software & Applications (Non-technical), Basic, QAS Self Study,
course code `GPT`. Nothing is registered yet; this file exists so that the
lesson prose can be written *from* the sources instead of being sourced after
the fact. `drafts/ATO-01-flag-triage.md` is the shape of the problem it
prevents: 41 `UNSOURCED` flags found after drafting, cleared in one long
sitting. Every factual sentence in a GPT lesson should trace to an entry
below before it is written; a sentence that has no entry is `UNSOURCED` from
the moment it is typed.

This is the fourth generation of the index. The first (changelog entry 22)
was built over a set with a duplicate file and no plan page; the second
(entry 23) over a corrected set whose pricing and enterprise-privacy pages
had been captured with their grid cells and FAQ answers collapsed; the
third (entry 24) over a recaptured set in which the enterprise-privacy
re-save had lost the page's "Updated" date and its SAML SSO line, and the
added ChatGPT Business product page turned out to be an image with no
citable text. The set is now settled: the print-layout enterprise-privacy
capture is back alongside the Reader-view one, and the image-only product
page is removed. The index was regenerated whole over that set and every
quote re-verified; git history holds the three earlier generations, and a
quote that was true of a removed capture is not carried forward unless it
is also in a current file.

**Extension, 2026-09-14 (changelog entry 29).** File 9
(`openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`) gained entries 13–16:
the two hallucination forms and the two limitations that GPT-01's review
record listed under J7 as on the page but not in the index. The extension
is additive — no existing entry was reworded or renumbered — and the four
new quotes were checked against the page's extracted text the same way as
the 155 before them. The coverage table is unchanged, because file 9
already carried ✓ on every objective and lesson the new entries are tagged
with.

**How to read an entry.** The claim is in this index's words and is what the
course could say. The quote under it is the document's words, verbatim,
forty words or fewer, with the page it sits on. One claim, one quote. The tag
in italics says which working learning objective (LO) and which planned
lesson (L01–L06) the entry bears on; the coverage table at the end is built
from those tags. Entries tagged *(no LO)* are indexed because the document is
in the set, not because the course needs them.

**Page numbers.** Pages are PDF page numbers as counted by the extractor
(`pypdf` 6.18, plain text mode, one page break per PDF page; `pdftotext` is
not installed on this machine). For the OpenAI, CPA.com and New Hampshire
files the PDF page is also the printed page. The AICPA Code prints its own
page numbers six behind the PDF page, so those entries give both, as
`(PDF p. 238, printed 232)`. Extracted text lives in the session scratchpad
and was not committed.

**Grid text.** The two pricing captures are feature-comparison grids whose
cells extracted as `Plan: <plan>, Feature: <row>, <value>`, and in many rows
the cell value is repeated in front of the `Plan:` label with no space
(`54KPlan: Business, …`). Quotes from those files reproduce the extracted
text exactly, repeats and all, because that is what the verifier can find.

**Two captures of one page.** `openai-enterprise-privacy-2026-09-13.pdf`
(Safari Reader view, FAQ answers expanded) and
`openai-enterprise-privacy-print-2026-09-13.pdf` (Chrome print layout, FAQ
answers collapsed) are the same OpenAI page captured an hour apart on the
same day. Each has its own section. The Reader-view section carries the
answers; the print-layout section carries only what the Reader-view capture
lacks — the date, the intro commitments including SAML SSO and the
retention-control line, and the FAQ question headings — and does not
repeat a claim the Reader-view section already makes. An entry in either
section cites its own file.

**One fact about the file set, found on listing it.** `sources/gpt/.DS_Store`
is a macOS Finder artifact, not a source. It is not indexed and is not
counted as a file below. The thirteen PDFs are each a section.

**Working learning objectives** (from `current-feature.md`, unchanged):

1. Describe how a large language model produces a response and identify the
   failure modes that matter in professional work: fabrication, staleness,
   instruction drift.
2. Configure a ChatGPT workspace for professional use, including data-sharing
   and training controls, and distinguish consumer, Team, and Enterprise data
   handling.
3. Apply a structured prompt pattern (role, task, inputs, constraints, output
   format) to routine accounting tasks.
4. Verify model output against a source before relying on it, and document
   the verification.
5. Identify client information that must not be entered into a
   general-purpose model under the confidentiality rule, and apply a firm
   policy to a given situation.

**Planned lessons:** L01 What the model is doing (text) · L02 Setting up for
professional use (text) · L03 Prompting for accounting tasks (text) · L04
Verifying the output (text) · L05 Confidentiality and client data (text) ·
L06 A task, start to finish (video).

---

## aicpa-code-1-700-001-confidential-client-information.pdf

**Note.** The filename names one rule; the file is the whole Code. Every
rule, interpretation and definition in the Code is available here, and the
entries below draw on 0.400 (definitions), 1.300 (general standards) and
1.700 (confidential information). The bytes are unchanged since the first
index (MD5 `1ff43d513cafdd127e8fe043d4b3842f`).

- **Filename:** `aicpa-code-1-700-001-confidential-client-information.pdf`
- **Publisher:** American Institute of CPAs (AICPA)
- **Title as printed:** the cover carries no extractable title; PDF p. 1
  reads "Effective December 15, 2014. Updated for all official releases
  through July 2026." and the text calls itself "The AICPA Code of
  Professional Conduct (the code)" (PDF p. 8, printed 2)
- **Date stated:** "Updated for all official releases through July 2026"
  (PDF p. 1); © 2026 (PDF p. 2). PDF metadata creation date 2026-08-10.
- **Retrieval date:** not in filename

**What it is**

The AICPA's complete codified ethics code, Parts 0 through 3 plus appendices,
as reissued after the July 2026 official releases. It is written for AICPA
members, and Part 1 (where the Confidential Client Information Rule lives)
binds members in public practice. It is the only authoritative document in
this set; everything else is a vendor page or a trade-body guide.

**Claims supported**

1. **A member in public practice may not disclose confidential client
   information without the client's specific consent.** *(LO 5; L05)*
   > A member in public practice shall not disclose any confidential client information without the specific consent of the client. (PDF p. 238, printed 232)

2. **"Confidential client information" is any information obtained from the
   client that is not available to the public.** *(LO 5; L05)*
   > Any information obtained from the client that is not available to the public. (PDF p. 24, printed 18)

3. **Information on public websites, databases and forums is "available to
   the public" and so outside the rule.** *(LO 5; L05)*
   > on publicly accessible websites, databases, online discussion forums, or other electronic media by which members of the public can access the information; (PDF p. 24, printed 18)

4. **The default is confidential: unless client information is public, treat
   it as confidential client information.** *(LO 5; L05)*
   > Unless the particular client information is available to the public, such information should be considered confidential client information. (PDF p. 25, printed 19)

5. **A client's name alone can be confidential client information when
   disclosing it implies something about the client.** *(LO 5; L05)*
   > if a member’s practice is limited to bankruptcy matters, disclosure of the client’s name could suggest that the client may be experiencing financial difficulties, which may be confidential client information. (PDF p. 244, printed 238)

6. **A "third-party service provider" includes any entity the member does
   not control.** *(LO 5; L05)*
   > An entity that the member does not control, individually or collectively with his or her firm or with members of his or her firm. (PDF p. 37, printed 31)

7. **Using a third-party service provider to help provide professional
   services creates threats to compliance with the confidentiality rule.**
   *(LO 5; L05)*
   > When a member uses a third-party service provider to assist the member in providing professional services, threats to compliance with the “Confidential Client Information Rule” [1.700.001] may exist. (PDF p. 240, printed 234)

8. **Before disclosing to a third-party service provider, one option is a
   confidentiality contract plus reasonable assurance about the provider's
   procedures.** *(LO 5; L05)*
   > Enter into a contractual agreement with the third-party service provider to maintain the confidentiality of the information and provide reasonable assurance that the third-party service provider has appropriate procedures in place (PDF p. 240, printed 234)

9. **How much assurance work is needed depends in part on what the provider
   has published about its own controls.** *(LO 5; L05)*
   > including the extent of publicly available information on the third-party service provider’s controls and procedures to safeguard confidential client information. (PDF p. 240, printed 234)

10. **The other option is the client's specific consent before the
    disclosure.** *(LO 5; L05)*
    > Obtain specific consent from the client before disclosing confidential client information to the third-party service provider. (PDF p. 241, printed 235)

11. **Consent to a third-party disclosure should say what information, to
    what kind of third party, and for what use.** *(LO 5; L05)*
    > The consent should specify the nature of the information that may be disclosed, the type of third party to whom it may be disclosed, and its intended use. (PDF p. 242, printed 236)

12. **A member who cannot demonstrate that safeguards were applied is in
    violation; a written firm policy is how a firm demonstrates it.**
    *(LO 5; L05)*
    > A member would be considered in violation of the “Confidential Client Information Rule” [1.700.001] if the member cannot demonstrate that safeguards were applied that eliminated or reduced significant threats to an acceptable level. (PDF p. 238, printed 232)

13. **State law on client confidentiality may be more restrictive than the
    Code, and the member has to check.** *(LO 5; L05)*
    > the member should consider whether federal, state, or local statutes, rules, or regulations concerning the confidentiality of client information may be more restrictive than the requirements in this interpretation. (PDF p. 242, printed 236)

14. **The General Standards Rule requires due professional care.** *(LO 4;
    L04)*
    > Due Professional Care. Exercise due professional care in the performance of professional services. (PDF p. 204, printed 198)

15. **The General Standards Rule requires sufficient relevant data as the
    basis for any conclusion, which is what verifying model output
    supplies.** *(LO 4; L04)*
    > Sufficient Relevant Data. Obtain sufficient relevant data to afford a reasonable basis for conclusions or recommendations in relation to any professional services performed. (PDF p. 204, printed 198)

16. **When a third-party provider does part of the work, the member still
    has to obtain the data that supports the work product.** *(LO 4; L04)*
    > The member must also obtain sufficient relevant data to support the work product and comply with all technical standards applicable to the professional services. (PDF p. 206, printed 200)

17. **The Code itself points to nonauthoritative AICPA guidance on using
    technology output and on AI, so the topic is on the AICPA's ethics
    agenda.** *(LO 4; L01, L04)*
    > A nonauthoritative question and answer regarding the use of technology and its output is available. See Ethics Questions & Answers section 400.02, “Using the Output of Technology.” (PDF p. 204, printed 198)

18. **The Code flags AI use as a source of threats to compliance, by
    reference to an AICPA staff article.** *(LO 5; L01, L05)*
    > A nonauthoritative article, Ethics Staff Insights: AI through an ethics lens, discusses threats to compliance with the code when members use AI to provide services. (PDF p. 238, printed 232)

**Does not cover**

- Whether typing client information into a chatbot is a "disclosure", or
  whether OpenAI is a "third-party service provider". The Code never names
  ChatGPT, an LLM, or generative AI in authoritative text. Applying 0.400.52
  and 1.700.040 to a model vendor is the author's inference, and the lesson
  should say so.
- The AI guidance it points to. Ethics Q&A 400.02 and "AI through an ethics
  lens" are cited, not reproduced; neither is in the set.
- Whether de-identified client data is still confidential client
  information. 1.700.110 offers de-identifying tax return information as an
  example safeguard in a tax practice review and goes no further.
- New Hampshire RSA 309-B:18 or any state statute. "New Hampshire", "309-B"
  and "RSA" do not appear in the extracted text; the statute is its own
  file in the set, indexed below.
- Anything about how a model works, prompting, or accuracy of AI output.

**Currency risk:** dated publication on a rolling cadence — the AICPA
reissues the Code as interpretations are adopted, and a code is a subject
4.01 puts on the annual review; pin "through July 2026" and re-check at each
review.

---

## cpacom-ai-solution-due-diligence-guide.pdf

**Note.** Mostly not this course. It is a list of questions a firm asks an AI
vendor, not statements about ChatGPT. Five of the eight entries bear on an
objective, each as a practice the course could recommend rather than a fact
about the product; three bear on none.

- **Filename:** `cpacom-ai-solution-due-diligence-guide.pdf`
- **Publisher:** CPA.com ("Developed by the CPA.com AI Working Group"; the
  "In collaboration with" partner is a logo the extractor cannot read)
- **Title as printed:** "AI solution due diligence guide for accounting
  firms" — subtitle "A practical evaluation framework for AI-enabled
  technology solutions."
- **Date stated:** not stated; © 2025 CPA.com on every page. PDF metadata
  creation date 2025-12-04.
- **Retrieval date:** not in filename

**What it is**

An eight-page evaluation framework for firms buying AI-enabled software: a
"top 5" quick start, question banks by topic, and a document checklist. It
is written for firm decision-makers talking to vendors and their sales
engineers. It assumes a vendor sits between the firm and the model.

**Claims supported**

1. **A firm should find out whether its data is sent on to an external
   model provider and what is stripped before it goes.** *(LO 2; L02)*
   > Whether data is sent to an external LLM (e.g., OpenAI, Anthropic, etc.) (p. 2)

2. **The contract between the vendor and the model operator decides whether
   the operator trains on customer data.** *(LO 2; L02)*
   > This agreement will cover elements of data privacy and, importantly, whether the operator uses customer data to train or otherwise improve the model. (p. 2)

3. **"We don't train on your data" deserves a follow-up about how that is
   enforced.** *(LO 2; L02)*
   > Be cautious of vague assurances like “we don’t train on your data” without supporting detail about how that’s enforced. (p. 4)

4. **A firm should test accuracy and hallucination on its own or anonymized
   data before relying on a tool.** *(LO 4; L04)*
   > Every firm should test accuracy, behavior and hallucinations using firm-specific or anonymized data. (p. 3)

5. **Nothing with client or sensitive information goes into a trial until
   the firm knows what happens to it afterward.** *(LO 5; L05)*
   > Be sure to understand what happens with your data after the trial period before uploading anything with client or sensitive information. (p. 3)

6. **An accuracy figure without a stated methodology is not evidence.**
   *(LO 4; L04)*
   > Be wary of anecdotal claims like “98% accuracy” without understanding the underlying methodology. (p. 6)

7. **Deterministic logic, not generative AI, belongs where the answer must
   be exact.** *(no LO)*
   > Deterministic logic (used where accuracy must be exact) (p. 2)

8. **A vendor's new AI feature is a new product for due-diligence purposes.**
   *(no LO)*
   > It is important that firms treat new AI features as separate products and perform due diligence on existing vendor relationships regularly, including but not limited to: (p. 7)

**Does not cover**

- What ChatGPT or OpenAI actually does with data; it tells the firm what to
  ask and never answers.
- Any plan tier. "Team", "Enterprise" and "Business" do not appear.
- How a model produces output or why it fabricates; "hallucinations" is used
  once, undefined.
- Prompting.
- The AICPA Code or any confidentiality rule; "professional obligations" is
  mentioned without citation.

**Currency risk:** dated trade-body publication (© 2025) with no revision
date; the vendor-evaluation advice ages slowly, but the named model providers
and the SOC 2 framing will date.

---

## cpacom-build-vs-buy-ai-decision-framework.pdf

**Note.** Not this course. None of the entries below bear on a learning
objective. The document is a build-or-buy framework for firm leaders
considering custom software; it says nothing about using ChatGPT.

- **Filename:** `cpacom-build-vs-buy-ai-decision-framework.pdf`
- **Publisher:** CPA.com ("Developed by the CPA.com AI Working Group in
  collaboration with radical+", p. 4)
- **Title as printed:** "BUILD vs. BUY: The decision framework for AI in
  accounting firms" — running head "A litmus test for firm leaders
  navigating the vibe coding era"
- **Date stated:** not stated; © 2026 CPA.com; the text says "Fast forward
  to 2026". PDF metadata creation date 2026-06-01.
- **Retrieval date:** not in filename

**What it is**

A four-page strategy piece for firm leadership on when to build software with
AI assistance, when to buy it, and what the hidden costs of building are. It
is written for partners and technology leads making capital decisions. Its
companion is the due-diligence guide above.

**Claims supported**

1. **"Vibe coding" is the document's term for generating working software
   from natural-language prompts.** *(no LO)*
   > Vibe coding — using AI to generate working software from natural-language prompts — has dramatically lowered the cost of prototyping (p. 1)

2. **In a multi-client environment, the model surfacing the wrong client's
   data is a failure mode firms underestimate.** *(no LO)*
   > In multi-client environments, the model retrieving or referencing the wrong client’s data is the failure mode most firms underestimate. (p. 2)

3. **Staff building or adopting AI tools without oversight is a named
   failure pattern.** *(no LO)*
   > Shadow IT: Teams independently build or adopt AI tools with no oversight, turning undocumented custom tools into mission-critical risks. (p. 2)

4. **Custom tools for regulated or sensitive-data workflows need governance
   most firms have not built.** *(no LO)*
   > Custom tools here need governance and security maturity that most firms haven’t yet built. (p. 3)

**Does not cover**

- ChatGPT, any OpenAI product, or any general-purpose model.
- Prompting, verification, or how a model produces output.
- The confidentiality rule or any client-data obligation; "sensitive client
  PII" is named once as a risk factor, without a rule.
- Any data-handling fact about any vendor.

**Currency risk:** dated publication (© 2026) tied to 2026 market conditions
and pricing models; low regulatory currency risk because the course does not
rely on it.

---

## cpacom-genai-toolkit.pdf

- **Filename:** `cpacom-genai-toolkit.pdf`
- **Publisher:** CPA.com
- **Title as printed:** "CPA.com Generative AI Toolkit" — subtitle "A roadmap
  for accounting and finance professionals to understand and leverage the
  transformative impact of GenAI"
- **Date stated:** not stated; © 2023 CPA.com (p. 28); it refers forward to
  "the 2024 Startup Accelerator program" (p. 2). PDF metadata creation date
  2023-10-25.
- **Retrieval date:** not in filename

**What it is**

A 28-page introduction to generative AI for accounting and finance
professionals: what it is, use cases with sample prompts, a seven-step
strategy, a security and risk section, and a glossary. It is written for
practitioners who have not yet used the tools, at the moment ChatGPT was new.
Its statements about what ChatGPT does with input are 2023 statements, and
two of them are contradicted by the 2026 OpenAI pages in this set; see
Currency risk.

**Claims supported**

1. **Generative AI gets things wrong and makes things up, and its confident
   tone hides it.** *(LO 1; L01)*
   > generative AI has also been found to get things wrong and even make things up—or hallucinate. Its confident, articulate and well-reasoned answers may mask this significant failing. (p. 5)

2. **A model asked for legal precedents has returned cases that do not
   exist.** *(LO 1; L01)*
   > In one case, when asked to cite precedents to be used in a court case, the system responded with cases that did not exist. (p. 26)

3. **LLM output is generated, not computed, so arithmetic and financial
    analysis should not be trusted to it. (Attributed in the document to
    Jeff Seibert, CEO of Digits.)** *(LO 1, 4; L01, L04)*
   > Today’s LLMs produce generated output, not computed answers, which means you shouldn’t trust them with math or financial analysis. (p. 15)

4. **A human should review any AI content used in a decision or sent to a
   client.** *(LO 4; L04)*
   > a human should review and ensure the appropriateness and accuracy of any content that is being used in decision-making or shared with clients. (p. 9)

5. **Monitoring generated answers for accuracy is the professional's
   responsibility.** *(LO 4; L04)*
   > Accounting professionals have a responsibility to monitor answers that are coming out of generative AI to ensure accuracy. (p. 19)

6. **The review process for AI output should be documented; the toolkit
   sends the firm to counsel for what that documentation must contain.**
   *(LO 4; L04)*
   > Discuss with general counsel necessary documentation of a review process for AI output. (p. 19)

7. **A prompt can ask for verbatim excerpts with citations so the human
   checks the source rather than the summary.** *(LO 3, 4; L03, L04, L06)*
   > By prompting the model to return verbatim excerpts, you can mimic the way a human researcher gathers information in order to reach conclusions more efficiently. (p. 11)

8. **Output quality depends on the prompt.** *(LO 3; L03)*
   > Generative AI is only as good as the prompt that drives it. (p. 16)

9. **Giving the model examples improves the output.** *(LO 3; L03)*
   > Providing the model with examples helps get a better output. (p. 16)

10. **Any data uploaded in the sample use cases must have identifying
    information removed first.** *(LO 3, 5; L03, L05, L06)*
    > Please note, any examples that reference uploading data will require all identifiable information to be removed prior to use. (p. 10)

11. **An acceptable-use policy should prohibit putting client data into a
    public generative AI tool.** *(LO 5; L05)*
    > the policy should prohibit uploading or asking questions about client data within a public generative AI tool. (p. 9)

12. **The general rule the toolkit states: no client or business
    information into a public LLM.** *(LO 5; L05)*
    > As a general rule, no client or business information should be entered into a public LLM. (p. 14)

13. **De-identify personal information before it goes into any AI tool,
    internal or public.** *(LO 5; L05)*
    > “De-identify” (sanitize) personal information before ingesting it into both internal AI systems and public tools. (p. 18)

14. **Sharing client confidential information with an AI vendor calls for
    written disclosure and specific consent first.** *(LO 5; L05)*
    > If a client’s confidential information will be shared with a third party vendor, including AI, provide written disclosure to and obtain specific consent from the client in the appropriate format before the confidential information is shared. (p. 18)

15. **A firm can disclose its AI use in the engagement letter even when no
    rule requires it.** *(LO 5; L05)*
    > If disclosure is not specifically required, consider still disclosing a firm's use of AI in the engagement letter. (p. 18)

16. **A policy should separate ordinary use from extraordinary use, such as
    producing professional advice.** *(LO 5; L05)*
    > Define ordinary use for AI tools, such as writing marketing language vs. extraordinary use such as using AI to produce counsel or professional advice. (p. 19)

17. **Whether a vendor trains on your data is in its terms of use, and
    vendors differ.** *(LO 2; L02)*
    > some vendors explicitly do not train their models on your data, for others it is part of the T&Cs. (p. 20)

18. **The toolkit's account of the Samsung incident: employees put
    confidential data into ChatGPT in March 2023.** *(LO 5; L05)*
    > In March 2023, Samsung employees inadvertently exposed confidential data to OpenAI via ChatGPT. (p. 19)

**Does not cover**

- How a model produces a response. The glossary says LLMs are "trained on
  vast amounts of data" and stops; nothing on prediction, tokens, or
  context. LO 1's mechanism is not here.
- Staleness or instruction drift as failure modes. Only fabrication is
  described.
- Any ChatGPT setting, plan or data control. "Team", "Enterprise" and
  "Business" do not appear; "public tool" and "public LLM" are never defined,
  so the toolkit cannot say whether a paid workspace is "public".
- The structured prompt pattern. Its prompt advice is "be specific", "give
  examples", "have a dialogue"; the words "role", "constraints" and "output
  format" never appear as elements.
- The AICPA Code. The consent guidance on p. 18 mirrors 1.700.040 but cites
  nothing.
- The Samsung incident's source. The case study on p. 19 is uncited and the
  course should not repeat its details as fact on this document's authority.

**Currency risk:** dated 2023 publication about a product that changed under
it — p. 9 says anything entered into ChatGPT "becomes public domain and is
used in the system’s continuous training", and p. 18 that public tools "often
rely on user input for its own training", both overtaken by the 2026 OpenAI
pages here (opt-out for individuals, no training by default for business
plans); it is already past 4.01's two-year window and must not be the source
for any current product behaviour.

---

## nh-rsa-309-b-18-confidential-communications.pdf

- **Filename:** `nh-rsa-309-b-18-confidential-communications.pdf`
- **Publisher:** New Hampshire General Court (gc.nh.gov, the state's
  online RSA text)
- **Title as printed:** "Section 309-B:18 Confidential Communications." under
  the running heads "TITLE XXX OCCUPATIONS AND PROFESSIONS", "CHAPTER 309-B
  NEW HAMPSHIRE ACCOUNTANCY ACT"
- **Date stated:** the source note reads "Source. 1999, 236:1, eff. Sept. 7,
  1999. 2024, 327:167, eff. July 1, 2024." (p. 1) — the section as captured
  reflects the 2024 amendment. No "last updated" date for the web page.
- **Retrieval date:** not in filename; print footer 9/13/26, 5:29 PM (p. 1)

**What it is**

One section of New Hampshire's accountancy statute, one page, as published
on the General Court's website: the confidentiality duty a New Hampshire
licensee owes a client, and the list of disclosures the chapter does not
prohibit. It is written as law, for licensees and those who regulate them,
not as guidance. It is the state-law counterpart to the AICPA rule above and
the only statute in the set.

**Claims supported**

1. **A New Hampshire licensee may not voluntarily disclose information a
   client communicated in connection with the services rendered.** *(LO 5;
   L05)*
   > shall not voluntarily disclose information communicated to such person by the client relating to and in connection with services rendered to the client by the licensee. (p. 1)

2. **The only general release from the duty is the client's permission, or
   that of the client's heirs, successors or personal representatives.**
   *(LO 5; L05)*
   > Except by permission of the client for whom a licensee performs services, or the heirs, successors, or personal representatives of such client (p. 1)

3. **The duty binds everyone in the licensee's firm, not only the licensee:
   partners, officers, members, managers, shareholders and employees.**
   *(LO 5; L05)*
   > a licensee or any partner, officer, member, manager, shareholder, or employee of a licensee shall not voluntarily disclose (p. 1)

4. **Client-communicated information is confidential by statute, not by
   agreement.** *(LO 5; L05)*
   > Such information shall be deemed confidential (p. 1)

5. **Disclosures the profession's reporting standards require, when
   reporting on an examination of financial statements, are not
   prohibited.** *(LO 5; L05)*
   > nothing in this chapter shall be construed as prohibiting the disclosure of information required to be disclosed by the standards of the public accounting profession in reporting on the examination of financial statements (p. 1)

6. **Disclosure under a subpoena or summons in court or agency proceedings
   is not prohibited.** *(LO 5; L05)*
   > or as prohibiting disclosures in court proceedings or administrative proceedings before governmental agencies in instances where a subpoena or summons has been issued (p. 1)

7. **Disclosure in licensing investigations, ethics investigations by
   professional bodies, and peer review is not prohibited.** *(LO 5; L05)*
   > in investigations or proceedings under RSA 310, in ethical investigations conducted by private professional organizations, or in the course of peer reviews (p. 1)

8. **Sharing within the organization serving the client is allowed on a
   need-to-know basis — the statute's own model of who may see client
   information.** *(LO 5; L05)*
   > or to other persons active in the organization performing services for that client on a need to know basis (p. 1)

9. **Sharing for the sole purpose of quality control is allowed, and the
   statute names the peer review entity and the organization serving the
   client as the recipients.** *(LO 5; L05)*
   > or to persons in such professional organization, peer review entity, or organization performing services for that client who need this information for the sole purpose of assuring quality control. (p. 1)

10. **The section dates from 1999 and was last amended effective July 1,
    2024, so a lesson can date the rule it cites.** *(LO 5; L05)*
    > Source. 1999, 236:1, eff. Sept. 7, 1999. 2024, 327:167, eff. July 1, 2024. (p. 1)

11. **The rule sits in the New Hampshire Accountancy Act, RSA chapter
    309-B.** *(LO 5; L05)*
    > CHAPTER 309-B NEW HAMPSHIRE ACCOUNTANCY ACT Section 309-B:18 (p. 1)

**Does not cover**

- A third-party service provider route. The AICPA interpretation (AICPA
  entries 8–10) lets a member disclose to a provider under a
  confidentiality contract plus reasonable assurance, *or* with the
  client's specific consent. The statute's exceptions list contains no
  service-provider, vendor or contractor clause; its general release is
  "permission of the client". Whether a model vendor falls under "persons
  in such ... organization performing services for that client" is not
  addressed, and the lesson should not say the statute permits it.
- What "voluntarily disclose" means, or whether entering information into
  software operated by someone else is a disclosure. The section never
  names technology, a vendor, or a computer system of any kind.
- The form of the client's permission. "Permission" is not qualified as
  written, specific, or informed; the AICPA's "specific consent" language
  (AICPA entry 11) has no counterpart here.
- Definitions. "Licensee", "client" and "services" are defined elsewhere in
  chapter 309-B, which is not in the set; so is any penalty.
- Whether de-identified or anonymized client information is still
  "information communicated to such person by the client".

**Currency risk:** statute — amended as recently as July 1, 2024, and 4.01
puts laws on the annual review; the capture is the General Court's web text
with a 9/13/26 footer, so re-capture from gc.nh.gov at each review and
compare the "Source." line for a newer session law.

---

## openai-chatgpt-pricing-business-2026-09-13.pdf

- **Filename:** `openai-chatgpt-pricing-business-2026-09-13.pdf`
- **Publisher:** OpenAI (chatgpt.com/pricing, the "Business & Enterprise"
  tab; the capture carries no URL, browser title or print footer)
- **Title as printed:** "Pricing" (p. 1); no subtitle captured
- **Date stated:** not stated. PDF metadata creation date 2026-09-13
  22:20 UTC.
- **Retrieval date:** 2026-09-13 (filename)

**What it is**

The feature-comparison grid from the business tab of ChatGPT's pricing page,
eight pages, two plan columns — Business and Enterprise — and rows running
from model access, response times and context windows through workspace
features to Study mode. It is written for a prospective business subscriber
choosing between the two plans. The capture is the grid and nothing else:
no plan cards, no prices, no Security & Administration grid, no Privacy row,
no FAQ, and no text for the `**` and `***` footnote markers. The per-plan
cells did survive this time, so the file says which plan has what.

**Claims supported**

1. **The business tier is two plans, Business and Enterprise; every row of
   the grid compares exactly those two.** *(LO 2; L02)*
   > Plan: Business, Feature: Legacy models, Yes Plan: Enterprise, Feature: Legacy models, Yes (p. 2)

2. **Business runs the Instant model with a 54K context window; Enterprise
   with 128K.** *(LO 1, 2; L01, L02)*
   > 54KPlan: Business, Feature: GPT Instant total context window, 54K 128KPlan: Enterprise, Feature: GPT Instant total context window, 128K (p. 2)

3. **On Business, the most a user can put into one Instant-model request
   is about 40 pages of text.** *(LO 3; L03)*
   > ~40 pages of textPlan: Business, Feature: GPT Instant input maximum***, ~40 pages of text (p. 2)

4. **Both business plans give the Reasoning model a 256K context window and
   an input maximum of about 320 pages.** *(LO 1, 3; L01, L03)*
   > 256KPlan: Business, Feature: GPT Reasoning total context window, 256K 256KPlan: Enterprise, Feature: GPT Reasoning total context window, 256K (p. 2)

5. **Enterprise responses are labelled "Fastest", Business "Fast" — the
   only speed difference the grid states.** *(LO 2; L02)*
   > FastPlan: Business, Feature: Response times, Fast FastestPlan: Enterprise, Feature: Response times, Fastest (p. 2)

6. **Memory sources are off on both business plans, where every personal
   plan has them on — a consumer/business difference the course can
   state.** *(LO 2; L02)*
   > Plan: Business, Feature: Memory sources, No Plan: Enterprise, Feature: Memory sources, No (p. 4)

7. **Memory across past chats is "Coming soon" on the business plans, not
   available at the capture date.** *(LO 2; L02)*
   > Coming soonPlan: Business, Feature: Memory with past chats, Coming soon (p. 4)

8. **Workspace agents are a business-plan feature, present on both Business
   and Enterprise and on no personal plan.** *(LO 2; L02)*
   > Plan: Business, Feature: Workspace agents, Yes Plan: Enterprise, Feature: Workspace agents, Yes (p. 5)

9. **"Company knowledge" — the workspace's connected internal sources — is
   on both business plans and on no personal plan.** *(LO 2; L02)*
   > Plan: Business, Feature: Company knowledge, Yes Plan: Enterprise, Feature: Company knowledge, Yes (p. 6)

10. **GPTs can be shared across the workspace on both business plans.**
    *(LO 2; L02)*
    > Plan: Business, Feature: Share GPTs with your workspace, Yes Plan: Enterprise, Feature: Share GPTs with your workspace, Yes (p. 7)

11. **File uploads, projects and data analysis are included on Business —
    the inputs step of a task can be done inside the workspace.** *(LO 3;
    L03, L06)*
    > Plan: Business, Feature: File uploads, Yes (p. 4)

12. **Data analysis (the code tool the "truth" page ties to accurate
    calculation) is on both business plans.** *(LO 1; L01, L06)*
    > Plan: Business, Feature: Data analysis, Yes Plan: Enterprise, Feature: Data analysis, Yes (p. 6)

13. **Search and deep research — the tools OpenAI's accuracy page says to
    use when accuracy matters — are on both business plans.** *(LO 4;
    L04)*
    > Plan: Business, Feature: Deep research, Yes Plan: Enterprise, Feature: Deep research, Yes (p. 8)

**Does not cover**

- **Plan names.** This file uses exactly two: "Business" and "Enterprise",
  each in every cell label. "Team" does not appear in any form. Nothing
  says whether Business replaced, renamed or coexists with a Team plan.
- **Training on business data.** Nothing. The words "train", "privacy",
  "opt-out" and "data" (other than "Data analysis") do not occur. The
  Privacy row the earlier collapsed capture carried as a label ("Content is
  used to train our models", "Opt-out available") is not in this capture,
  so the pricing page cannot be cited for any plan's training default; the
  enterprise-privacy page (below) is the source for that.
- **Prices.** None. No "$", no per-user figure, no monthly/annual terms;
  the plan cards were not captured. The earlier capture's FAQ sentence
  listing the paid plans and their per-user pricing is not in this file
  either.
- **Security and administration.** SAML SSO, admin console, admin roles,
  SOC 2, data residency, compliance API and the other rows of the earlier
  capture's Security & Administration grid are absent here. SAML SSO alone
  is in the print-layout enterprise-privacy capture (file 11), as a general
  commitment not tied to a plan; the rest is in no file.
- **Footnotes.** "Flexible**" and "input maximum***" point to footnotes
  that were not captured; the earlier capture's context-window footnote
  (shared window, system instructions, memories) is gone with them.

**Currency risk:** product pricing page that changes without notice and
carries no date; the model names (GPT-6 Astra, GPT-5.6 Sol, Terra, Luna)
and every context figure are as of the capture date only, and the page
tab is a live product grid that will move; re-capture before every 4.01
review.

---

## openai-chatgpt-pricing-personal-2026-09-13.pdf

- **Filename:** `openai-chatgpt-pricing-personal-2026-09-13.pdf`
- **Publisher:** OpenAI (chatgpt.com/pricing, the "Personal" tab; the
  capture carries no URL, browser title or print footer)
- **Title as printed:** "Pricing" (p. 1); no subtitle captured
- **Date stated:** not stated. PDF metadata creation date 2026-09-13
  21:59 UTC.
- **Retrieval date:** 2026-09-13 (filename)

**What it is**

The feature-comparison grid from the personal tab of ChatGPT's pricing page,
thirteen pages, four plan columns — Free, Go, Plus and Pro — and the same
rows as the business grid. It is written for an individual choosing a plan.
Like its business counterpart it is the grid only: no plan cards, no prices,
no Security & Administration or Privacy rows, no FAQ, no footnote text. Its
value to the course is the contrast with the business grid: the same rows,
so the two files together say what a personal plan lacks.

**Claims supported**

1. **The personal tier is four plans: Free, Go, Plus and Pro.** *(LO 2;
   L02)*
   > Plan: Free, Feature: Legacy models, No Plan: Go, Feature: Legacy models, No Plan: Plus, Feature: Legacy models, Yes Plan: Pro, Feature: Legacy models, Yes (p. 2)

2. **The Instant model's context window is 27K on Free and 54K on Go — the
   model is working from a bounded window whose size depends on the
   plan.** *(LO 1; L01)*
   > 27KPlan: Free, Feature: GPT Instant total context window, 27K 54KPlan: Go, Feature: GPT Instant total context window, 54K (p. 3)

3. **On the Free plan the most a user can put into one Instant-model
   request is about 12 pages of text.** *(LO 3; L03)*
   > ~12 pages of textPlan: Free, Feature: GPT Instant input maximum***, ~12 pages of text (p. 3)

4. **Pro's Reasoning model accepts about 680 pages of input, the largest
   figure on either grid.** *(LO 3; L03)*
   > ~680 pages of textPlan: Pro, Feature: GPT Reasoning input maximum***, ~680 pages of text (p. 4)

5. **Response times on Free and Go are limited by bandwidth and
   availability.** *(LO 2; L02)*
   > Limited on bandwidth & availability Plan: Free, Feature: Response times, Limited on bandwidth & availability (p. 2)

6. **No personal plan has workspace agents — the row is "No" in all four
   columns, where both business plans have "Yes".** *(LO 2; L02)*
   > Plan: Free, Feature: Workspace agents, No Plan: Go, Feature: Workspace agents, No Plan: Plus, Feature: Workspace agents, No Plan: Pro, Feature: Workspace agents, No (p. 8)

7. **No personal plan has "Company knowledge"; connected internal sources
   are a business-plan feature.** *(LO 2; L02)*
   > Plan: Free, Feature: Company knowledge, No Plan: Go, Feature: Company knowledge, No Plan: Plus, Feature: Company knowledge, No Plan: Pro, Feature: Company knowledge, No (p. 10)

8. **Memory sources are on for every personal plan, where the business
   grid says "No".** *(LO 2; L02)*
   > Plan: Free, Feature: Memory sources, Yes Plan: Go, Feature: Memory sources, Yes Plan: Plus, Feature: Memory sources, Yes Plan: Pro, Feature: Memory sources, Yes (p. 6)

9. **File uploads are limited on Free and included from Go up.** *(LO 3;
   L03)*
   > LimitedPlan: Free, Feature: File uploads, Limited Plan: Go, Feature: File uploads, Yes (p. 7)

10. **Search is on every personal plan, so the "with search" answers the
    accuracy page describes are available even on Free.** *(LO 1, 4; L01,
    L04)*
    > Plan: Free, Feature: Search, Yes Plan: Go, Feature: Search, Yes Plan: Plus, Feature: Search, Yes Plan: Pro, Feature: Search, Yes (p. 6)

11. **Deep research is limited on Free and Go and full on Plus and Pro.**
    *(LO 4; L04)*
    > LimitedPlan: Free, Feature: Deep research, Limited LimitedPlan: Go, Feature: Deep research, Limited Plan: Plus, Feature: Deep research, Yes Plan: Pro, Feature: Deep research, Yes (p. 12)

12. **Data analysis is limited on Free and included from Go up.** *(LO 1;
    L01)*
    > LimitedPlan: Free, Feature: Data analysis, Limited Plan: Go, Feature: Data analysis, Yes Plan: Plus, Feature: Data analysis, Yes (p. 8)

**Does not cover**

- **Training on data.** Nothing. "Train", "privacy" and "opt-out" do not
  occur; the Privacy row is not in this capture. The consumer training
  default is sourced from the "How your data is used" page, not from here.
- **Prices.** None. No "$" and no plan cards; the Free/Go/Plus/Pro list
  prices the earlier collapsed capture carried are not in this file.
- **Business plans.** "Business", "Enterprise" and "Team" do not appear;
  the business grid is its own file.
- **The FAQ and the security grid.** Neither was captured. What "Limited"
  means for any row, and what the `*` and `***` footnotes say, is not in
  the file.
- **Ads.** The earlier capture's "This plan may include ads" line for Go
  is not here.

**Currency risk:** product pricing page that changes without notice and
carries no date; model names and context figures are as of the capture
date only; re-capture before every 4.01 review.

---

## openai-data-controls-faq-2026-09-13.pdf

- **Filename:** `openai-data-controls-faq-2026-09-13.pdf`
- **Publisher:** OpenAI (OpenAI Help Center, help.openai.com, collection
  "ChatGPT › Data Controls")
- **Title as printed:** "Data Controls FAQ" — subtitle "Learn how to manage
  your ChatGPT data settings"
- **Date stated:** "Updated: 3 days ago" as rendered at retrieval; the page
  shows no absolute date
- **Retrieval date:** 2026-09-13 (filename; print footer 9/13/26, 4:55 PM)

**What it is**

A help-center FAQ, six printed pages, explaining the Data Controls settings in
ChatGPT: how to stop conversations being used for training, Temporary Chats,
and where business plans differ. It is written for individual ChatGPT users
on consumer plans. The capture includes a transient site banner about Pro
plan sign-ups, which shows how live the page is.

**Claims supported**

1. **Data Controls are where a user chooses whether conversations are used
   to improve OpenAI's models.** *(LO 2; L02)*
   > Data Controls let you decide how ChatGPT uses your conversations and interactions. They specifically allow you to choose whether your conversations help improve our models. (p. 1)

2. **Training is turned off under Settings → Data Controls, or through the
   privacy portal.** *(LO 2; L02, L06)*
   > Turn it off in ChatGPT under Settings → Data Controls, or select “Do not train on my content” in the privacy portal. (p. 3)

3. **Turning off training does not remove conversations from history.**
   *(LO 2; L02)*
   > Your conversations will still appear in your chat history but won't be used to train ChatGPT. (p. 2)

4. **The setting is account-wide, not per device.** *(LO 2; L02)*
   > Once you turn off model training, the setting applies to your entire account. It doesn’t matter which device you’re using. (p. 3)

5. **Temporary Chats are deleted after 30 days.** *(LO 2; L02)*
   > Temporary Chats are deleted from our systems after 30 days. (p. 4)

6. **Temporary Chats are still visible to OpenAI for abuse monitoring.**
   *(LO 2; L02)*
   > May be reviewed only to monitor for abuse (p. 4)

7. **Turning off memory and personalization does not turn off safety
   features that may read limited context.** *(LO 2; L02)*
   > turning off Memory and Personalization features does not disable safety features that may use limited, safety-relevant context in rare, high-risk situations (p. 4)

8. **The training setting can be changed at any time.** *(LO 2; L02)*
   > Yes — you can change this setting anytime. There are no restrictions. (p. 4)

9. **Team, Enterprise and Edu plans have additional data controls beyond
   the consumer ones; this page defers to the enterprise privacy page for
   them.** *(LO 2; L02)*
   > Yes, our Team, Enterprise, and Edu plans offer additional data controls. (p. 5)

**Does not cover**

- What "Team" or "Enterprise" is, what either does with data, or who in a
  workspace can see whose chats. Entry 9 is the page's only mention of Team.
- What "used to train" means technically, or how long ordinary
  (non-temporary) conversations are retained.
- Uploaded files. It links a "File Uploads FAQ" that is not in the set.
- Accuracy, prompting, or any professional obligation.
- Whether the training setting has any effect on conversations already
  used before it was turned off.

**Currency risk:** help-center page that changes without notice — the only
date is the relative "Updated: 3 days ago" at retrieval; the highest
currency risk in the set, re-capture before every 4.01 review.

---

## openai-does-chatgpt-tell-the-truth-2026-09-13.pdf

- **Filename:** `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`
- **Publisher:** OpenAI (OpenAI Help Center, collection "Privacy and
  policies › Educator FAQ")
- **Title as printed:** "Does ChatGPT tell the truth?" — subtitle
  "Understand when ChatGPT can be trusted, what it might get wrong, and how
  to critically assess its responses."
- **Date stated:** "Updated: 30 days ago" as rendered at retrieval; no
  absolute date
- **Retrieval date:** 2026-09-13 (filename; print footer 9/13/26, 4:57 PM)

**What it is**

A short help-center article on the limits of ChatGPT's accuracy: what a
hallucination is, the knowledge cutoff, why confidence is not reliability,
and practical tips for checking. It is written for educators and their
students, not for professionals, and is the only OpenAI page in the set
that speaks to accuracy at all.

**Claims supported**

1. **ChatGPT produces responses from patterns in its training data and can
   be wrong or misleading.** *(LO 1; L01)*
   > ChatGPT is designed to provide useful responses based on patterns in data it was trained on. But like any language model, it can produce incorrect or misleading outputs. (p. 1)

2. **It can sound confident while being wrong.** *(LO 1; L01)*
   > Sometimes, it might sound confident—even when it’s wrong. (p. 1)

3. **"Hallucination" is OpenAI's own term for factually inaccurate
   output.** *(LO 1; L01)*
   > This phenomenon is often referred to as a hallucination: when the model produces responses that are not factually accurate (p. 1)

4. **Fabricated citations and references to non-existent sources are a
   named form of hallucination.** *(LO 1; L01, L04)*
   > Fabricated quotes, studies, citations or references to non-existent sources (p. 1)

5. **The model has a knowledge cutoff and does not know later events unless
   a tool is used — the "staleness" failure mode.** *(LO 1; L01)*
   > Knowledge cutoff: The models are trained on data up to a certain point and responses do not incorporate information about events beyond that, unless tools are used. (p. 2)

6. **Expressed confidence is not a measure of correctness.** *(LO 1; L01,
   L04)*
   > Confidence isn’t reliability: The model may express high confidence even in incorrect answers. (p. 2)

7. **OpenAI itself tells users to verify important information against
   reliable sources.** *(LO 4; L04)*
   > That’s why we encourage users to approach ChatGPT critically and verify important information from reliable sources. (p. 2)

8. **Treat output as a first draft, not a final source.** *(LO 4; L04,
   L06)*
   > Use ChatGPT as a first draft, not a final source. (p. 3)

9. **Quotes, data, technical information and document references are always
   to be verified.** *(LO 4; L04)*
   > Always verify quotes, data, technical information or references to external documents. (p. 3)

10. **Without search, answers come from training only; with search, cited
    web sources.** *(LO 1; L01)*
    > Without search enabled: Responses are based on what the model has learned during training. (p. 3)

11. **When accuracy matters, follow the cited links to the source rather
    than trusting the citation.** *(LO 4; L04, L06)*
    > Use available tools like search or deep research and check sources when accuracy matters by visiting links directly. (p. 3)

12. **Calculation is done reliably only when the model uses a code tool,
    not from the language model itself.** *(LO 1; L01)*
    > Enables accurate calculations, data visualizations, and structured logic (p. 2)

Entries 13–16 were added 2026-09-14 (changelog entry 29; GPT-01 review J7).
They are the items the page lists at the locations of entries 4 and 5 that
the fourth generation did not carry. Nothing above was renumbered.

13. **Incorrect definitions, dates, or facts are a named form of
    hallucination.** *(LO 1; L01)*
    > Incorrect definitions, dates, or facts (p. 1)

14. **Overconfident answers to ambiguous or complex questions are a named
    form of hallucination.** *(LO 1; L01)*
    > Overconfident answers to ambiguous or complex questions (p. 1)

15. **Lack of access is a listed limitation: the model may be unable to
    reach a given website because of technical issues, paywalls, or a
    site's robots.txt preferences.** *(LO 1; L01, L04)*
    > Lack of access: The model may not be able to obtain relevant information from a given website due to technical issues, paywalls or preferences set via robots.txt. (p. 2)

16. **Bias and over-simplification is a listed limitation: the model may
    present one perspective as absolute truth, oversimplify nuanced issues,
    or misrepresent the weight of consensus or debate.** *(LO 1; L01)*
    > Bias and over-simplification: In some cases, it may: Present a single perspective as absolute truth Oversimplify complex or nuanced issues Misrepresent the weight of scientific consensus or social debate (p. 2)

**Does not cover**

- The mechanism. "Patterns in data it was trained on" is the whole
  explanation; nothing on next-token prediction, context windows or
  sampling. LO 1's "describe how a large language model produces a
  response" rests on that one phrase.
- Instruction drift, or any failure that emerges over a long conversation.
- What "reliable sources" means for accounting work, or how to document a
  verification.
- Any error rate or measure of how often it is wrong.
- Data handling, settings, or plans.

**Currency risk:** help-center page that changes without notice; its table
of tools is plan-dependent and its audience is educators.

---

## openai-enterprise-privacy-2026-09-13.pdf

- **Filename:** `openai-enterprise-privacy-2026-09-13.pdf`
- **Publisher:** OpenAI (openai.com/enterprise-privacy, the corporate site,
  not the help center; the capture carries no URL or print footer)
- **Title as printed:** "Enterprise privacy at OpenAI" (p. 1)
- **Date stated:** not stated in this capture. The print-layout capture of
  the same page (next section) carries "Updated: January 8, 2026"; that
  line did not survive the Reader-view re-save. PDF metadata creation date
  2026-09-13 21:57 UTC.
- **Retrieval date:** 2026-09-13 (filename)

**What it is**

OpenAI's public statement of its data commitments for its business
products, five pages, saved from Safari Reader view with the FAQ accordions
expanded. It is written for prospective business customers and their
compliance staff. The print-layout capture (next section) has the FAQ
questions without their answers; this one has the answers without their
question headings — only one heading survives, "ChatGPT Enterprise,
ChatGPT Edu, and ChatGPT for Healthcare FAQ" (p. 2) — and the intro's
bullet list of commitments is gone too. Which answer belongs to which
product is read from the answer's own words (each names its product), or
paired with a question heading in the print-layout capture.

**Claims supported**

1. **"Business data" means inputs and outputs from ChatGPT Business,
   Enterprise, Healthcare, Edu, Teachers and the API Platform, and OpenAI's
   commitments attach to that.** *(LO 2; L02)*
   > Our commitments provide you with ownership and control over your business data (inputs and outputs from ChatGPT Business, ChatGPT Enterprise, ChatGPT for Healthcare, ChatGPT Edu, ChatGPT for Teachers and our API Platform) (p. 1)

2. **Business data is not used for training by default.** *(LO 2; L02,
   L05)*
   > By default, we do not use your business data for training our models. (p. 1)

3. **The exception is an explicit opt-in, such as the feedback
   mechanisms; shared data may then be used for training.** *(LO 2; L02,
   L05)*
   > If you have explicitly opted in to share your data with us (for example, through our opt-in feedback mechanisms(opens in a new window)) to improve our services, then we may use the shared data to train our models. (p. 1)

4. **Business and Enterprise are the two plans OpenAI names for deploying
   ChatGPT to employees.** *(LO 2; L02)*
   > The easiest way to get started with OpenAI is to deploy ChatGPT Business or ChatGPT Enterprise for your employees. (p. 1)

5. **Workspace admins choose which connected apps are enabled, and data
   reached through apps is not trained on by default.** *(LO 2; L02)*
   > Your workspace admins can control which apps are enabled for your workspace. (p. 1)

6. **The customer keeps its rights in inputs and owns outputs, to the
   extent law allows.** *(LO 2; L02)*
   > you retain all rights to the inputs you provide to our services and you own any output you rightfully receive from our services to the extent permitted by law. (p. 1)

7. **Data is encrypted at rest with AES-256 and in transit.** *(LO 2;
   L02)*
   > OpenAI encrypts all data at rest (AES-256) and in transit between our customers (p. 1)

8. **A Data Processing Addendum is available for Business, Enterprise and
   the API — the contract the Code's third-party-provider route asks
   for.** *(LO 2, 5; L02, L05)*
   > we are able to execute a Data Processing Addendum (DPA) with customers for their use of ChatGPT Business, ChatGPT Enterprise, and the API (p. 2)

9. **Business data may be run through automated classifiers and safety
   tools; the classifications are metadata and do not contain the data.**
   *(LO 2, 5; L02, L05)*
   > We may run any business data submitted to OpenAI’s services through automated content classifiers and safety tools, including to better understand how our services are used. (p. 2)

10. **Human review of business data happens only as the page describes for
    each service.** *(LO 2, 5; L02, L05)*
    > Business data is only subject to human review as described below on a service-by-service basis. (p. 2)

11. **ChatGPT Enterprise is the product with organization-level controls,
    deployment tools and speed.** *(LO 2; L02)*
    > Built for businesses, ChatGPT Enterprise offers organizations the ability to use ChatGPT with controls, deployment tools, and speed required to make your entire organization more productive. (p. 2)

12. **On Enterprise, end users see their own conversations and admins reach
    an audit log of conversations and GPTs through the Compliance API.**
    *(LO 2; L02)*
    > Within your organization, end users can view their own conversations. Your organization has control over workspaces, and workspace admins can access an audit log of conversations and GPTs through the Enterprise Compliance API (p. 2)

13. **On Enterprise, OpenAI staff read conversations only to resolve
    incidents, to recover a user's chats with explicit permission, or when
    law requires.** *(LO 2, 5; L02, L05)*
    > Authorized OpenAI employees will only ever access your conversations for the purposes of resolving incidents, recovering end user conversations with your explicit permission, or where required by applicable law. (p. 2)

14. **Enterprise, Edu and Healthcare have each completed a SOC 2 Type 2
    audit — published control information of the kind the Code says
    reduces the assurance work a member must do.** *(LO 2, 5; L02, L05)*
    > They’ve each successfully completed a SOC 2 Type 2 audit. (p. 2)

15. **On Enterprise, admins set retention and deleted conversations are
    removed within 30 days unless law requires otherwise.** *(LO 2; L02)*
    > Your workspace admins control how long your data is retained. Any deleted conversations are removed from our systems within 30 days, unless we are legally required to retain them. (p. 3)

16. **ChatGPT Business is the self-serve dedicated workspace for small and
    growing businesses.** *(LO 2; L02)*
    > Built for small and growing businesses, ChatGPT Business offers collaborative tools and self-serve access to the power of ChatGPT in a dedicated workspace for your team. (p. 3)

17. **On Business, workspace admins can view, access, export and delete
    every member's conversations — a firm's admin can read staff chats.**
    *(LO 2, 5; L02, L05)*
    > Workspace admins have control over workspaces and can view, access, export, and delete end user conversations in the workspace. (p. 3)

18. **On Business, OpenAI's access is limited to authorized employees for
    support, abuse and legal compliance, and to confidentiality-bound
    contractors reviewing for abuse.** *(LO 2, 5; L02, L05)*
    > specialized third-party contractors who are bound by confidentiality and security obligations, solely to review for abuse and misuse. (p. 3)

19. **ChatGPT Business has completed a SOC 2 Type 2 audit.** *(LO 2, 5;
    L02, L05)*
    > ChatGPT Business successfully completed a SOC 2 Type 2 audit. (p. 3)

20. **On Business too, admins control retention; deleted or unsaved
    conversations are removed within 30 days unless law or harm-prevention
    requires longer.** *(LO 2; L02)*
    > Any deleted or unsaved conversations are removed from our systems within 30 days, unless longer retention is required by law, or is reasonably necessary to protect our services or any third party from harm. (p. 3)

21. **The second stage of model training uses data from ChatGPT users and
    human trainers.** *(LO 1; L01)*
    > Then, we use data from ChatGPT users and human trainers to make sure the outputs are safe and accurate and to improve their general capabilities. (p. 5)

22. **OpenAI trains on data from the individual versions of ChatGPT — the
    consumer side of the line the course must draw.** *(LO 2; L02, L05)*
    > We also use data from versions of ChatGPT and other services for individuals. (p. 5)

23. **By default, data from every named business product, including the API
    since March 1, 2023, is not used for training.** *(LO 2; L02, L05)*
    > By default, data from ChatGPT Business, ChatGPT Enterprise, ChatGPT for Healthcare, ChatGPT Edu, ChatGPT for Teachers, and the API Platform (after March 1, 2023) isn’t used for training our models, (p. 5)

**Does not cover**

- **Plan names, and "Team".** This page names ChatGPT Business, ChatGPT
  Enterprise, ChatGPT for Healthcare, ChatGPT Edu, ChatGPT for Teachers and
  the API Platform. "Team" never appears as a plan name; "team" occurs
  three times in lower case ("engineering teams", "security team", "for
  your team"). The plan the Data Controls FAQ calls "Team" is not
  connected to any plan here, and nothing says whether Business is Team
  renamed. LO 2 names "Team"; the author has to resolve this before
  writing it.
- **Training on business data — now answered.** The page says, twice, that
  business data is not used for training by default (entries 2 and 23), for
  every product it names including Business and Enterprise, and that the
  exception is an explicit opt-in (entry 3). What it does not say is what
  "business data" excludes, or whether a Business workspace member can
  opt in individually.
- **The FAQ questions.** The answers are present; the question headings
  are not, so "which question this answers" is inferred from the answer's
  own text or paired with a heading in the print-layout capture. The intro
  bullet list — the "Updated: January 8, 2026" line, "Enterprise-level
  authentication through SAML SSO" and the line restricting the headline
  retention commitment to Enterprise, Healthcare and Edu — is not in this
  capture; the print-layout capture (next section) carries all three and
  is the file to cite for them.
- **Consumer plans.** One sentence (entry 22) says OpenAI trains on data
  from ChatGPT for individuals; the consumer default and opt-out are on the
  "How your data is used" and Data Controls pages.
- **Whether de-identified data is still "business data", how "explicitly
  opted in" is presented to a user, or anything about accuracy or
  prompting.**

**Currency risk:** corporate web page that changes without notice and, in
this capture, carries no date (the print-layout capture of the same page
says January 8, 2026);
the product names have already drifted between this page and the Data
Controls FAQ captured the same day; re-capture before every 4.01 review.

---

## openai-enterprise-privacy-print-2026-09-13.pdf

**Note.** Second capture of the page indexed in the section above, in the
browser's print layout rather than Reader view. Its extracted text and its
PDF creation timestamp (2026-09-13 20:56:39 UTC) are identical to the
capture indexed in entries 22 and 23 and replaced in entry 24; the bytes
are not identical to that git blob (MD5 `e05acbb9…` here, `38e020e9…` at
commit `20fee1e`), so cite this file, not the history. The entries below
take only what the Reader-view capture lacks; a claim that capture already
carries is cited there and not repeated here.

- **Filename:** `openai-enterprise-privacy-print-2026-09-13.pdf`
- **Publisher:** OpenAI (openai.com/enterprise-privacy; the print footer
  carries the URL `https://openai.com/enterprise-privacy/?utm_source=chatgpt.com`
  and the browser title "Enterprise privacy at OpenAI | OpenAI")
- **Title as printed:** "Enterprise privacy at OpenAI" (p. 1)
- **Date stated:** "Updated: January 8, 2026" (p. 1). PDF metadata creation
  date 2026-09-13 20:56 UTC (Chrome print to PDF).
- **Retrieval date:** 2026-09-13 (filename; print footer 9/13/26, 4:56 PM)

**What it is**

Chrome's print-to-PDF of OpenAI's enterprise-privacy page, nine pages: the
page's headline commitments as bullets under Ownership, Control and
Security; the FAQ as question headings grouped by product, with every
answer collapsed; and two pages of site navigation at the end. It is
written for the same readers as the Reader-view capture, prospective
business customers and their compliance staff. In this set it is that
capture's complement: the date, the intro bullets and the question headings
are here, the answers are there.

**Claims supported**

1. **The page states its own last-updated date, January 8, 2026 — the one
   dated statement of OpenAI's business-data commitments in the set.**
   *(LO 2; L02)*
   > Updated: January 8, 2026 (p. 1)

2. **Enterprise-level single sign-on through SAML is one of the access
   controls OpenAI lists among its commitments.** *(LO 2; L02)*
   > Enterprise-level authentication through SAML SSO (p. 2)

3. **The headline retention commitment names Enterprise, Healthcare and Edu
   and not Business; the Business FAQ answer (Reader-view entry 20)
   separately says Business admins can control retention.** *(LO 2; L02)*
   > You control how long your data is retained (ChatGPT Enterprise, ChatGPT for Healthcare, ChatGPT Edu) (p. 1)

4. **The customer decides who in its organization has access to the
   workspace.** *(LO 2; L02)*
   > You decide who has access within your organization (p. 1)

5. **Access and available features are controllable at a fine grain — the
   admin-side control a firm policy can lean on.** *(LO 2; L02)*
   > Fine-grained control over access and available features (p. 2)

6. **OpenAI describes its SOC 2 audit as confirming controls for security
   and confidentiality — published control information of the kind the
   Code's assurance step weighs (AICPA entry 9).** *(LO 2, 5; L02, L05)*
   > Successfully completed a SOC 2 audit, confirming that our controls align with industry standards for security and confidentiality (p. 2)

7. **Encryption is stated as a commitment, at rest and in transit both to
   the customer and to OpenAI's own service providers.** *(LO 2; L02)*
   > Data encryption at rest (AES-256) and in transit between our customers and us, and between us and our service providers (TLS 1.2+) (p. 2)

8. **Whether OpenAI trains on business data is a question the page poses
   in its own words; Reader-view entries 2 and 3 are the answer.** *(LO 2;
   L02)*
   > Does OpenAI train its models on my business data? (p. 2)

9. **Whether OpenAI reviews business data is its own FAQ question;
   Reader-view entries 9 and 10 are the answer.** *(LO 2, 5; L02, L05)*
   > Does OpenAI review my business data? (p. 3)

10. **Who can see conversations in ChatGPT Business is its own FAQ
    question, asked for Business separately from Enterprise; Reader-view
    entry 17 is the answer.** *(LO 2, 5; L02, L05)*
    > Who can view conversations and chat history in ChatGPT Business? (p. 5)

11. **Retention for ChatGPT Business is its own FAQ question; Reader-view
    entry 20 is the answer.** *(LO 2; L02)*
    > What is OpenAI’s policy on data retention for ChatGPT Business? (p. 5)

12. **The page groups its FAQ by product, so a Business answer is not an
    Enterprise answer and the course should not read one plan's terms
    onto the other.** *(LO 2; L02)*
    > ChatGPT Business FAQ (p. 5)

13. **What data OpenAI trains on is its own FAQ question; Reader-view
    entries 22 and 23 are the answer, including the consumer/business
    line.** *(LO 2; L02)*
    > What sources of data are used for training OpenAI models? (p. 8)

**Does not cover**

- **Plan names.** The same six products as the Reader-view capture: ChatGPT
  Business, ChatGPT Enterprise, ChatGPT for Healthcare, ChatGPT Edu,
  ChatGPT for Teachers and the API Platform, plus "Custom models" as a
  link label. "Team" does not appear as a plan name; "team" occurs twice
  in lower case ("engineering teams", p. 2; "for your team", p. 5).
  Nothing connects Business to a plan called Team.
- **Training on business data.** The headline commitment reads "We do not
  train our models on your data by default" (p. 1), and the FAQ asks
  "Does OpenAI train its models on my business data?" (p. 2) with the
  answer collapsed. The commitment, its opt-in exception and its
  product-by-product restatement are Reader-view entries 2, 3 and 23;
  cite those, not this file, for the training default.
- **FAQ answers.** None. Every answer is collapsed. This capture was made
  at 4:56 PM and the Reader-view capture at 5:57 PM the same day; pairing a
  question here with an answer there rests on the question text and the
  product heading it sits under, not on anything either file says about
  the other.
- **Which plans have SAML SSO.** The line sits in the general commitments,
  not under a product heading, and nothing says whether ChatGPT Business
  has it. The business pricing grid (file 6) was captured without its
  Security & Administration rows, so no file assigns SSO to a plan.
- **Navigation, not content.** Pages 8 and 9 are the site footer. The
  product and model names listed there (GPT-6, GPT-5.6, Codex, ChatGPT
  Business, ChatGPT Enterprise) are menu items and must not be cited as
  facts about any plan.

**Currency risk:** corporate web page that changes without notice; this
capture is dated January 8, 2026 by the page itself and 9/13/26, 4:56 PM
by the print footer, the only such pairing in the set; re-capture before
every 4.01 review and compare the "Updated" line.

---

## openai-how-your-data-is-used-2026-09-13.pdf

- **Filename:** `openai-how-your-data-is-used-2026-09-13.pdf`
- **Publisher:** OpenAI (OpenAI Help Center, collection "Privacy and
  policies › Policy FAQ")
- **Title as printed:** "How your data is used to improve model
  performance" — subtitle "Learn more about how OpenAI uses content from
  our services to improve and train our models."
- **Date stated:** "Updated: 3 days ago" as rendered at retrieval; no
  absolute date
- **Retrieval date:** 2026-09-13 (filename; print footer 9/13/26, 4:55 PM)

**What it is**

A help-center policy article on when OpenAI trains on user content, split
into services for individuals and services for businesses. It is written for
any ChatGPT user and is the page that states the consumer default. It is
the bridge between the consumer Data Controls FAQ and the enterprise
privacy page.

**Claims supported**

1. **ChatGPT is improved by training on users' conversations unless the
   user opts out — the consumer default is in.** *(LO 1, 2; L01, L02)*
   > ChatGPT, for instance, improves by further training on the conversations people have with it, unless you opt out. (p. 1)

2. **On individual plans, OpenAI may use content to train.** *(LO 2; L02,
   L05)*
   > When you use our services for individuals such as ChatGPT and Codex, we may use your content to train our models. (p. 1)

3. **Either opt-out path is enough on its own.** *(LO 2; L02)*
   > For ChatGPT and Codex tasks, either option is sufficient. You do not need to opt out in both places. (p. 2)

4. **Opting out is prospective: it covers new conversations.** *(LO 2;
   L02)*
   > After you opt out, we won’t train our models on your new conversations. (p. 2)

5. **Giving thumbs-up/down feedback can put the whole conversation into
   training even after opting out.** *(LO 2; L02, L05)*
   > If you choose to provide feedback, the entire conversation associated with that feedback may be used to train our models. (p. 2)

6. **A Temporary Chat is not kept in history, does not touch memory, and is
   not used for training.** *(LO 2; L02)*
   > Chats from Temporary Chat won't appear in history, use or create memories, or be used to train our models. (p. 2)

7. **Business products — Business, Enterprise, the API — are not trained on
   by default.** *(LO 2; L02, L05)*
   > By default, we do not train on any inputs or outputs from our products for business users, including ChatGPT Business, ChatGPT Enterprise, and the API. (p. 2)

8. **Some interaction data is retained, with steps taken to reduce personal
   information before it reaches a training set.** *(LO 2; L02)*
   > We retain certain data from your interactions with us, but we take steps to reduce the amount of personal information in our training datasets before they are used to improve and train our models. (p. 3)

**Does not cover**

- "Team". Like the enterprise page it says "ChatGPT Business".
- How long conversations are retained, or who at OpenAI can read them.
- Whether opting out affects conversations already used.
- Uploaded files: whether they are "content" in the same sense as
  conversations.
- How a model produces output; entry 1 is about improvement, not
  generation.

**Currency risk:** help-center page that changes without notice; relative
date only ("Updated: 3 days ago" at retrieval).

---

## openai-prompt-engineering-best-practices-2026-09-13.pdf

- **Filename:** `openai-prompt-engineering-best-practices-2026-09-13.pdf`
- **Publisher:** OpenAI (OpenAI Help Center, collection "ChatGPT")
- **Title as printed:** "Prompt engineering best practices for ChatGPT" —
  subtitle "Learn how to craft effective prompts to get the best out of
  ChatGPT"
- **Date stated:** "Updated: last month" as rendered at retrieval; no
  absolute date
- **Retrieval date:** 2026-09-13 (filename; print footer 9/13/26, 4:57 PM)

**What it is**

A one-page help-center primer: what a prompt is, what prompt engineering is,
three general best practices, and links to longer guides. It is written for
any ChatGPT user. Its substance is under 300 words; the guides it links
to are not in the set.

**Claims supported**

1. **A prompt is the text (or image or audio) that starts a conversation or
   triggers a response.** *(LO 3; L03)*
   > A prompt for a Large Language Model (LLM) is a text input that initiates a conversation or triggers a response from the model. (p. 1)

2. **Prompt engineering is designing and refining the input to guide the
   response.** *(LO 3; L03)*
   > Prompt engineering is the process of designing and optimizing input prompts to effectively guide a language model's responses. (p. 1)

3. **Prompts should be clear, specific, and carry enough context.** *(LO 3;
   L03)*
   > Ensure your prompts are clear, specific, and provide enough context for the model to understand what you are asking. (p. 2)

4. **Prompting is iterative: prompt, review, refine.** *(LO 3; L03, L06)*
   > Start with an initial prompt, review the response, and refine the prompt based on the output. (p. 2)

5. **Tone is set with descriptive adjectives in the prompt.** *(LO 3;
   L03)*
   > Use descriptive adjectives to indicate the tone. Words like formal, informal, friendly, professional, humorous, or serious can help guide the model. (p. 2)

6. **OpenAI's API prompting guides apply to ChatGPT too.** *(LO 3; L03)*
   > Though some may reference our API, the recommendations themselves are relevant for ChatGPT. (p. 2)

**Does not cover**

- Accuracy, verification, or hallucination. The page says nothing about
  whether a better prompt yields a truer answer.
- The structured pattern in LO 3. "Role", "inputs", "constraints" and
  "output format" are not named; the page's three practices are clarity,
  iteration and tone.
- Any accounting or professional example.
- Supplying source documents, or asking for citations.
- Data handling or confidentiality.

**Currency risk:** help-center page that changes without notice; relative
date only, and most of its content is links to guides that were not
captured.

---

## Coverage

Columns are the thirteen source files in `ls` order; the key is directly
above the table because the filenames do not fit in a header row. A ✓ means
the source has at least one claim entry tagged with that objective or
lesson. The table was generated from the entry tags by the verification
script and pasted here unchanged.

| # | File |
|---|---|
| 1 | `aicpa-code-1-700-001-confidential-client-information.pdf` |
| 2 | `cpacom-ai-solution-due-diligence-guide.pdf` |
| 3 | `cpacom-build-vs-buy-ai-decision-framework.pdf` |
| 4 | `cpacom-genai-toolkit.pdf` |
| 5 | `nh-rsa-309-b-18-confidential-communications.pdf` |
| 6 | `openai-chatgpt-pricing-business-2026-09-13.pdf` |
| 7 | `openai-chatgpt-pricing-personal-2026-09-13.pdf` |
| 8 | `openai-data-controls-faq-2026-09-13.pdf` |
| 9 | `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf` |
| 10 | `openai-enterprise-privacy-2026-09-13.pdf` |
| 11 | `openai-enterprise-privacy-print-2026-09-13.pdf` |
| 12 | `openai-how-your-data-is-used-2026-09-13.pdf` |
| 13 | `openai-prompt-engineering-best-practices-2026-09-13.pdf` |

| | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LO 1 |   |   |   | ✓ |   | ✓ | ✓ |   | ✓ | ✓ |   | ✓ |   |
| LO 2 |   | ✓ |   | ✓ |   | ✓ | ✓ | ✓ |   | ✓ | ✓ | ✓ |   |
| LO 3 |   |   |   | ✓ |   | ✓ | ✓ |   |   |   |   |   | ✓ |
| LO 4 | ✓ | ✓ |   | ✓ |   | ✓ | ✓ |   | ✓ |   |   |   |   |
| LO 5 | ✓ | ✓ |   | ✓ | ✓ |   |   |   |   | ✓ | ✓ |   |   |
| L01 | ✓ |   |   | ✓ |   | ✓ | ✓ |   | ✓ | ✓ |   | ✓ |   |
| L02 |   | ✓ |   | ✓ |   | ✓ | ✓ | ✓ |   | ✓ | ✓ | ✓ |   |
| L03 |   |   |   | ✓ |   | ✓ | ✓ |   |   |   |   |   | ✓ |
| L04 | ✓ | ✓ |   | ✓ |   | ✓ | ✓ |   | ✓ |   |   |   |   |
| L05 | ✓ | ✓ |   | ✓ | ✓ |   |   |   |   | ✓ | ✓ | ✓ |   |
| L06 |   |   |   | ✓ |   | ✓ |   | ✓ | ✓ |   |   |   | ✓ |

**Currency of the ✓s.** Files 6 through 13 are web pages that change
without notice; of them only file 11 states a date on the page. File 4 is
a 2023 publication already overtaken on the facts it states about ChatGPT.
Files 1 (the Code) and 5 (the statute) are the stable, authoritative
sources, and both are on 4.01's annual cadence as a code and a law; files
2 and 3 are dated trade-body publications.

### Gaps

Reported, not fixed. No new source is proposed here.

- **LO 2's training controls are sourced on both sides of the line.** File
  10 says business data — ChatGPT Business and Enterprise by name — is not
  used for training by default and that the exception is an explicit
  opt-in; file 12 says the same for business products and gives the
  consumer default (training on, opt-out available); file 9 gives the
  consumer switch; file 11 dates the business commitments January 8, 2026.
- **LO 2's "Team" is still a name only one source uses.** File 8 says Team,
  Enterprise and Edu have "additional data controls" and stops. Files 6,
  10, 11 and 12 say "Business" and never "Team". Nothing in the set says
  whether Team and Business are the same plan, and nothing says one
  replaced the other. The set can distinguish consumer from business and
  can describe Business and Enterprise; it cannot describe a plan called
  Team. Rewording the objective is not this index's decision.
- **What the recaptures dropped is partly back.** File 11 restores the
  enterprise page's "Updated: January 8, 2026" date, its SAML SSO line and
  the line restricting the headline retention commitment to Enterprise,
  Healthcare and Edu. Still in git history only, and not citable from the
  current set: the pricing page's plan prices, its "Paid plans (Go, Plus,
  Business, and Enterprise) are priced per user per month" sentence, its
  "Enterprise and Business can purchase credits" footnote, its Privacy and
  Security & Administration row labels, its shared-context-window
  footnote, and the Go plan's "may include ads" line. A lesson that needs
  any of these needs a capture that has them.
- **The ChatGPT Business product page is not in the set.** The image-only
  capture was removed, so the product page's own description of the plan
  is not citable. File 10's Business FAQ answer (entry 16) is the set's
  description of what ChatGPT Business is, and the business pricing grid
  (file 6) is the set's list of what it includes.
- **Prices are in no file.** Both pricing captures are feature grids
  without plan cards. The course does not need a price, but it cannot
  state one.
- **LO 1, first half, is still mostly unsourced.** No document explains how
  a large language model produces a response. The nearest are "patterns in
  data it was trained on" (file 9), "generated output, not computed
  answers" (file 4, a quoted CEO), the two-stage training account (file
  10, entry 21), and the context-window and input-maximum rows of the two
  grids (files 6 and 7), which attach figures to plans but do not carry
  the footnote explaining what shares the window. "Instruction drift"
  appears in no source. "Staleness" is supported only as the knowledge
  cutoff on file 9. Every ✓ on LO 1 is from a web page or the 2023
  toolkit; L01's ✓ from file 1 is only the Code's pointer to AI guidance it
  does not contain.
- **LO 2's ✓s are all high-currency-risk.** Every source bearing on LO 2 and
  L02 is a web page (6, 7, 8, 10, 11, 12), the 2023 toolkit (4), or a
  vendor-question list (2). File 10 is the most complete of them and is
  undated in its own capture; file 11 supplies the date for the same page.
- **LO 3's pattern is unsourced.** No source names role, inputs,
  constraints or output format as elements of a prompt. Files 13 and 4
  support clarity, specificity, examples, iteration and tone; files 6 and
  7 add only that input length is bounded and that files can be uploaded.
  The five-element pattern in LO 3 will be `UNSOURCED` as a pattern even
  if each element can be argued from those. Every LO 3 source is high
  currency risk.
- **LO 4 is sourced but thin on documentation.** Verification itself is well
  supported (files 1, 2, 4, 9). "Document the verification" has one line
  of support: file 4 sends the firm to counsel for what to document. No
  source gives a form of record.
- **LO 5 has state law, and the two rules do not line up.** File 5 supplies
  New Hampshire RSA 309-B:18. Its general release is "permission of the
  client" and its exceptions list has no service-provider clause, while
  the Code (file 1) lets a member use a third-party provider under a
  confidentiality contract with reasonable assurance and no client
  consent. Files 10 and 11 supply the vendor-side half of the Code's route
  (a DPA, SOC 2 audits, limited human access, SAML SSO: file 10 entries 8,
  13, 14, 18, 19 and file 11 entries 2, 6); nothing supplies the statute's
  half. A lesson that teaches the Code's contract route as sufficient for
  a New Hampshire licensee would be unsourced on the statute.
- **Neither rule names technology.** Whether entering client information
  into ChatGPT is a "disclosure" (file 1) or a "voluntary disclosure"
  (file 5) is the author's inference in both cases; no source in the set
  applies either rule to a model or a chatbot.
- **"General-purpose model" is undefined.** LO 5 turns on it; file 4 says
  "public LLM" and "public generative AI tool" without defining either, and
  no OpenAI page uses any such term.
- **SAML SSO is sourced as a commitment, not as a plan feature.** File 11
  lists it under OpenAI's general commitments; no file says which plan has
  it, because the business pricing grid was captured without its Security
  & Administration rows.
- **L06 has no source of its own.** The video lesson will rest on file 4's
  use-case prompts (2023, naming tools that may no longer exist as named),
  on files 6, 8, 9 and 13 for the workspace, settings, verification and
  iteration steps. Nothing in the set describes a complete accounting task
  end to end.
- **File 3 contributes nothing** to any objective, by subject. File 2
  contributes five entries, all practices rather than facts. File 5
  contributes eleven, all to LO 5 and L05. File 11 contributes thirteen,
  all to LO 2 and L02 with three also on LO 5 and L05, and by design none
  that file 10 already carries.

---

## How this index was made

- Extracted 2026-09-13 with `pypdf` 6.18.1 in plain text mode into the
  session scratchpad, one `.txt` per PDF, a `===== PAGE N =====` marker per
  page. `pdftotext` is not installed here. Nothing was written under
  `sources/` or `out/`.
- Every quote above was checked mechanically against the extracted text of
  its cited page: whitespace collapsed, end-of-line hyphens joined, fi/fl
  ligatures expanded, nothing else normalized. 155 quotes checked,
  155 found verbatim on the cited page, none over 40 words. A quote
  that had failed would have been removed, not paraphrased; none did.
- Section headers were compared to `ls sources/gpt/` and match one to one;
  `.DS_Store` is excluded as noted at the top.
- Sections for the twelve files whose bytes did not change between the
  third index and this one were carried over and re-verified rather than
  rewritten, with edits to the Reader-view enterprise-privacy section and
  the business pricing section where they had said the date and SAML SSO
  line were in no file. The section for
  `openai-enterprise-privacy-print-2026-09-13.pdf` was written fresh from
  the file; the section for the removed ChatGPT Business product page was
  dropped with it.
