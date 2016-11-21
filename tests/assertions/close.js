export default function(context, actual, expected, maxDifference, message) {
    var passes = (actual === expected) || Math.abs(actual - expected) <= maxDifference;

    this.pushResult({ passes, actual, expected, message });
}
