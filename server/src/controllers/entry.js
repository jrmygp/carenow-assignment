const EntryService = require("../services/entry");

const entryController = {
  createEntry: async (req, res) => {
    try {
      const { patient_name, date, cost, descriptions, medications } = req.body;

      const serviceResult = await EntryService.createEntry(patient_name, date, cost, descriptions, medications);

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  },
  getAllEntry: async (req, res) => {
    try {
      const serviceResult = await EntryService.getAllEntry();

      if (!serviceResult.success) throw serviceResult;
      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  },
};

module.exports = entryController;
