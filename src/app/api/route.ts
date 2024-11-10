import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany()
    return NextResponse.json(surveys, { status: 200 })
  } catch (error) {
    console.error('Error al obtener los registros:', error)
    return NextResponse.json({ error: 'Error al obtener los registros' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const survey = await prisma.survey.create({ data })
    return NextResponse.json( survey )
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ error: 'Error al crear el registro' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, updates } = await request.json()
    const updatedRecord = await prisma.survey.update({
      where: { id },
      data: updates,
    })
    return NextResponse.json(updatedRecord, { status: 200 })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ error: 'Error al actualizar el registro' }, { status: 500 })
  }
}
