const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, 
  questionDetails: { type: String, required: true },
  sampleTables: [
    {
      tableName: { type: String, required: true },
      columns: [
        {
          columnName: { type: String, required: true },
          dataType: { type: String, required: true }, 
        },
      ],
      rows: [
        {
          type: mongoose.Schema.Types.Mixed,
        },
      ],
    },
  ],
  expectedOutput: {
    type: {
      type: String,
      enum: ["table", "single_value", "column", "row", "count"],
      required: true,
    },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, 
    description: { type: String },          
    questions: [questionSchema],         
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Assignment", assignmentSchema);
