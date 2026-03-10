# Piscine: Music Data Project
#### By Marissa Molejon (@marissamolejon) 

## LIVE DEMO
https://piscine-music-data-project.netlify.app/

## Introduction
### User Story

As someone who loves listening to music, I often wonder what my listening habits actually look like when viewed through data. For example, which songs or artists I return to the most, or whether my listening patterns change depending on the day or time.

This project was created to explore those kinds of questions. The website analyzes listening history data and presents insights about users’ music behavior. Friends can also explore the data by selecting different users from a dropdown menu to see how their listening patterns compare. 

## Questions to answer

1. What was the user's most often listened to song according to the data?
2. What was the user's most often listened to artist according to the data?
3. What was the user's most often listened to song on Friday nights (between 5pm and 4am)?
4. What are the answers to the above questions if using _listening time_ rather than _number of listens_?
5. What song did the user listen to the most times in a row (i.e. without any other song being listened to in between)? How many times was it listened to?
6. Are there any songs that, on each day the user listened to music, they listened to every day? If the answer is yes, you should show which one(s). If the answer is no, you should not show anything about this question.
7. What were the user's top three genres to listen to by number of listens?

## Setup
To install `jest`:
```
npm install jest
```
To install `http-server`:
```
npm install http-server
```

## Rubric

All of the below requirements must be met for the project to be considered complete:

* The website must contain a drop-down which lists four users.
* Selecting a user must display answers relevant to that user (see table below).
* The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:
  * User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").
  * If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.
  * If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres" or "Top 2 genres" or similar.
* Unit tests must be written for at least one non-trivial function.
* The website must score 100 for accessibility in Lighthouse

Bonus points (which don't mean anything):

* Re-using code between the "most often" questions (i.e. questions 1, 2, 3, 4).
* End-to-end tests.

## Screenshot

(https://i.postimg.cc/ht8t7MXQ/Screenshot-2026-03-10-at-10-47-30.png)
(https://i.postimg.cc/K4Sm1gFw/Screenshot-2026-03-09-at-23-34-14.png)
(https://i.postimg.cc/Z5LyhJxW/Screenshot-2026-03-10-at-10-16-23.png)

## Accessibility
The goal is for the site to achieve a Lighthouse accessibility score of 100.

## Testing
At least one meaningful function in the project includes unit tests using Jest.|
