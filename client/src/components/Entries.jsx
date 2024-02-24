import EntryItem from "./EntryItem";

const Entries = ({ entries }) => {
  return (
    entries.length > 0 &&
    entries.map((entry) => {
      return (
        <EntryItem
          key={entry.id}
          name={entry.patient_name}
          date={entry.date}
          cost={entry.cost}
          descriptions={entry.descriptions}
          medications={entry.medications}
        />
      );
    })
  );
};

export default Entries;
