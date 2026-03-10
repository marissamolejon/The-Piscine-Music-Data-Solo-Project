# Testing Record

## Utility Functions from common.mjs
### Purpose
The goal of these tests was to verify the correctness of the utility functions used for processing music listening data. These functions analyze user listening events to extract useful insights such as the most frequently played song, Friday night listening activity, longest consecutive song streaks, and songs played on every active listening day.

The tests ensure that the functions behave correctly with normal input data as well as edge cases such as empty arrays.

## Function: getMostOften(events, propertyGetter)

### Purpose
This function determines which item appears most frequently in a list of events using a provided property selector.

## Test Cases

1. Ensures the function identifies the most frequent item.

```javascript
test('returns the most frequent item', () => {
  const events = [
    { song_id: 1 },
    { song_id: 2 },
    { song_id: 1 },
    { song_id: 3 },
    { song_id: 1 },
    { song_id: 2 },
  ];

  const result = getMostOften(events, e => e.song_id);
  expect(result).toEqual(["1", 3]);
});
```

2. Ensures the function handles empty input safely.

```
test('returns null for empty array', () => {
  expect(getMostOften([], e => e.song_id)).toBeNull();
});
```

## Function: isFridayNight(timestamp)

### Purpose
This function checks whether a given timestamp falls within the defined Friday night listening period.

Friday night is defined as:

* Friday after 17:00
* Saturday before 04:00

## Test Cases

1. Ensures the function returns true for Friday evening.

```javascript
test('returns true for Friday after 17:00', () => {
  const fridayEvening = new Date('2026-03-13T18:30:00');
  expect(isFridayNight(fridayEvening)).toBe(true);
});
```

2. Ensures the function returns true for early Saturday morning.

```javascript
test('returns true for Saturday before 4:00', () => {
  const saturdayEarly = new Date('2026-03-14T03:00:00');
  expect(isFridayNight(saturdayEarly)).toBe(true);
});
```

3. Ensures the function returns false for Friday before the evening threshold.

```javascript
test('returns false for Friday before 17:00', () => {
  const fridayMorning = new Date('2026-03-13T10:00:00');
  expect(isFridayNight(fridayMorning)).toBe(false);
});
```

4. Ensures the function returns false for Saturday after the allowed time window.

```javascript
test('returns false for Saturday after 4:00', () => {
  const saturdayMorning = new Date('2026-03-14T05:00:00');
  expect(isFridayNight(saturdayMorning)).toBe(false);
});
```

## Function: calculateLongestStreak(events)

### Purpose
This function determines the longest consecutive streak of the same song being played.

## Test Cases

1. Ensures the function correctly detects the longest streak.

```javascript
test('returns the longest consecutive song streak', () => {
  const events = [
    { song_id: 1 },
    { song_id: 1 },
    { song_id: 2 },
    { song_id: 2 },
    { song_id: 2 },
    { song_id: 1 },
  ];

  const result = calculateLongestStreak(events);
  expect(result).toEqual({ id: 2, length: 3 });
});
```

2. Ensures the function handles empty input safely.

```javascript
test('returns null for empty events', () => {
  expect(calculateLongestStreak([])).toBeNull();
});
```

## Function: getEveryDaySongs(events)

### Purpose
This function identifies songs that were played on every active listening day.

## Test Cases

1. Ensures the function returns songs played every day.

```javascript
test('returns songs played every active day', () => {
  const events = [
    { song_id: 1, timestamp: '2026-03-01T10:00:00' },
    { song_id: 2, timestamp: '2026-03-01T11:00:00' },
    { song_id: 1, timestamp: '2026-03-02T09:00:00' },
    { song_id: 2, timestamp: '2026-03-02T12:00:00' },
    { song_id: 1, timestamp: '2026-03-03T10:00:00' },
  ];

  const result = getEveryDaySongs(events);
  expect(result).toEqual([1]);
});
```

2. Ensures the function returns an empty array when there are no events.

```javascript
test('returns empty array if no events', () => {
  expect(getEveryDaySongs([])).toEqual([]);
});
```

## Summary

The unit tests verify that all utility functions behave as expected across multiple scenarios. The tests cover normal use cases, edge cases, and invalid input conditions. Running these tests ensures the reliability and correctness of the music data analysis features implemented in the project.
