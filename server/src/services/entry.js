const Service = require("./service");

const { getDocs, addDoc } = require("firebase/firestore");

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
        statusCode: 200,
        message: "New entry submitted!",
      });
    } catch (error) {
      console.log(error);
      return this.handleError({
        statusCode: 500,
        message: "Server error!",
      });
    }
  };

  static getAllEntry = async () => {
    try {
      let entries = [];
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            entries.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        })
        .catch((error) => {
          return this.handleError({
            statusCode: 500,
            message: error.message,
          });
        });

      return this.handleSuccess({
        statusCode: 200,
        message: "Entries found",
        data: entries,
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
