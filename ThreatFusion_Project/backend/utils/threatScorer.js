exports.calculateThreatScore = (threat) => {
  let score = 0;
  if (threat.cvss >= 9) score += 5;
  else if (threat.cvss >= 7) score += 3;
  if (threat.exploited) score += 4;
  if (threat.reports > 10) score += 2;
  return score;
};

exports.getPriorityLabel = (score) => {
  if (score >= 10) return '🔴 Critical';
  if (score >= 7) return '🟠 High';
  if (score >= 4) return '🟡 Medium';
  return '🟢 Low';
};