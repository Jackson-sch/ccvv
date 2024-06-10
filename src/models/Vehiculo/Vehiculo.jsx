import { Schema, model, models } from "mongoose";

const vehiculoReportadosSchema = new Schema(
    {
        placa: {
            type: String,
            trim: true,
        },
        marca: {
            type: String,
            trim: true,
        },
        color: {
            type: String,
            trim: true,
        },
        prioridad: {
            type: String,
            trim: true,
        },
        detalles: {
            type: String,
            trim: true,
        }
    }
)

export default models.VehiculoReportados || model("VehiculoReportados", vehiculoReportadosSchema);