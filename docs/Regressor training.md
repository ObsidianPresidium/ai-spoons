# Regressor training

The machine learning algorithm used is a random forest regressor. There should be various models used for each predictor. Currently, only `predictLowEnergy` is implemented.
It takes the inputs `stressorType` and `recoveryTime`, and predicts for `energy`.

`stressorType` is a unique number, each different title in an event has one. Repeats of the same event use the same number. Example: Walking the dog might have stressorType 1, going to school might have stressorType 2.

`recoveryTime` is the number of hours between this event and the last event. 8 hours of sleep count for double, meaning if one event is at 20:00 the first day, and another at 8:00 the next, the number should be 20. (4+(8*2)).