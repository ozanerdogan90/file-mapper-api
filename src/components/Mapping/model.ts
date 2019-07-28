import * as mongoose from 'mongoose';
export interface IMapping extends mongoose.Document {
    name: string;
    owner: string;
    createdDate: Date;
    updatedDate: Date;
    fileType: string; //// csv or excel
    headerRow: number;
    startRow: number;
    isActive: boolean;
    columnMappings: IColumnMapping[];
}

export interface IColumnMapping extends mongoose.Document {
    from: string;
    to: string;
    isMandatory: boolean;
    fieldTransformations: IFieldTransformation[];
}

export interface IFieldTransformation extends mongoose.Document {
    extractRegex: string;
    replaceRegex: string;
    ignoreRegex: string;
    multiplyValue: number;
}

const mappingSchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    owner: { type: String, required: true },
    createdDate: { type: Date },
    isActive: { type: Boolean },
    updatedDate: { type: Date },
    fileType: { type: String, required: true },
    headerRow: { type: Number, required: true },
    startRow: { type: Number, required: true },
    columnMappings: [{
        from: { type: String, required: true, },
        to: { type: String, required: true },
        isMandatory: { type: Boolean, required: true },
        fieldTransformations: [{
            extractRegex: { type: String, required: false },
            replaceRegex: { type: String, required: false },
            ignoreRegex: { type: String, required: false },
            multiplyValue: { type: Number, required: false },
        }
        ]
    }],
});

// tslint:disable-next-line: no-any
mappingSchema.pre('save', function (next: any) {
    if (this.isModified) {
        this.updatedDate = Date.now();
    }

    if (this.isNew) {
        this.createdDate = Date.now();
        this.isActive = true;
    }

    return next();
});


export const Mapping: mongoose.Model<IMapping> = mongoose.model<IMapping>('Mapping', mappingSchema);
