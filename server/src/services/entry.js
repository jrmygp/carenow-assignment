const Service = require("./service");

const { addDoc } = require("firebase/firestore");

const { colRef } = require("../config/firebase");

class EntryService extends Service {
  static createEntry = async (patient_name, date, cost, descriptions, medications) => {
    try {
      addDoc(colRef, {
        patient_name,
        date,
        cost,
        descriptions,
        medications,
      });

      return this.handleSuccess({
        statusCode: 201,
        message: "Account Registered, please check your email to verify your account!",
      });
    } catch (error) {
      console.log(error);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };
}

module.exports = EntryService;
