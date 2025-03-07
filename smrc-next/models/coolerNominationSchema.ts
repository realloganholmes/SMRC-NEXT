import mongoose, { Document, Schema } from 'mongoose';

interface ICoolerNomination extends Document {
  nominee: string;
  date: Date;
  comment?: string;
  nominator: string;
}

const coolerNominationSchema = new Schema<ICoolerNomination>({
  nominee: { type: String, required: true },
  date: { type: Date, required: true },
  comment: { type: String, default: '' },
  nominator: { type: String, required: true },
});

const CoolerNomination = mongoose.model<ICoolerNomination>('Nomination', coolerNominationSchema);

export default CoolerNomination;
