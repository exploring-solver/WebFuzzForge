const Report = require('../models/Report');

class ReportGenerator {
  async generateReport(userId, url, toolName, results) {
    try {
      const report = new Report({
        user: userId,
        url,
        toolName,
        results,
      });
      await report.save();
      return report;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  async getReports(userId) {
    try {
      const reports = await Report.find({ user: userId }).sort({ executionTime: -1 });
      return reports;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  async getReportById(reportId) {
    try {
      const report = await Report.findById(reportId);
      return report;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  }
}

module.exports = ReportGenerator;