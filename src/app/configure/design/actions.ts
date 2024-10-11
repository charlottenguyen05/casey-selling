"use server"
import { db } from "@/db"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client"

export type updateConfigArgs = { color: CaseColor, finish: CaseFinish, material: CaseMaterial, model: PhoneModel, configId: string }

export async function updateConfigs({ color, finish, material, model, configId }: updateConfigArgs) {
    // Save the configuration to the server
    await db.configuration.update({
        where: {
            id: configId
        }, data: {
            color,
            finish,
            material,
            model
        }
    })
}
