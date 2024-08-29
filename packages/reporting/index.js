class ReportGenerator {
    generateReport(results) {
      let report = "WebFuzzForge Scan Report\n";
      report += "========================\n\n";
  
      for (const [toolName, toolResults] of Object.entries(results)) {
        report += `${toolName} Results:\n`;
        report += "-----------------\n";
        for (const result of toolResults) {
          report += JSON.stringify(result, null, 2) + "\n";
        }
        report += "\n";
      }
  
      return report;
    }
  }
  
  module.exports = ReportGenerator;