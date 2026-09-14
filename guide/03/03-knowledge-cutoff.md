# The knowledge cutoff

<!-- index: 9#5, 9#9, 9#10 -->

OpenAI's page lists a knowledge cutoff among the limitations of its models:
the models are trained on data up to a certain point, and responses do not
incorporate information about events beyond that point unless tools are
used. There are two parts to that sentence, and both matter. The first is
the cutoff itself: the training data stops somewhere, and so does what the
model learned from it. The second is the exception: with tools, a response
can incorporate later information. The page draws the same line elsewhere,
in describing search: without search enabled, responses are based on what
the model learned during training; with search, it can cite web sources.

This course's word for the failure is *staleness*: a response that
reflects the training data as of the cutoff and not what has happened
since. The word is the course's, not the vendor's; the vendor's term is
the knowledge cutoff, and the glossary lists both.

This course does not give a date for the cutoff. Any date written here
would be a fact this course cannot source from the documents it relies on,
and one that could not be kept current in a printed guide.

Suppose, purely as an illustration, that a question turns on a figure that
is revised every year. A response produced without a tool carries only
what the training data carried, up to the cutoff. The page's own advice
covers the case: verify data before relying on it. Lesson 4 takes up how.
