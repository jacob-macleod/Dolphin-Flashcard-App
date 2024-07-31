# What is this file?

This file tracks all the known bugs for each release. Before a release is merged from development to main, each of these bugs MUST be resolved, by linking a closed ticket after the bug description.

Prefably, you would fix a bug before merging a feature branch to development, but sometimes bugs may need a seperate ticket.

## 3.5.0

* Flashcards not visible in daily mode
  * When you create a flashcard, add cards, then click "back to studying", no flashcards can be seen when on the Daily Mode tab, because of how the cards are read in Daily Mode
* Duplicate flashcards not counted
  * In some cases, such as in Daily Mode or when seeing the number of flashcards in the main tab, duplicate flashcards are not counted. The best solution to this probably would be to make it impossible to add duplicate flashcards within the same set.
