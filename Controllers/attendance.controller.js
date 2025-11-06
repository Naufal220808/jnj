import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAttendance = async (req, res) => {
    try {
        const attendance = await prisma.attendance.findMany({});
        res.status(200).json({ attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAttendanceById = async (req, res) => {
    try {
        const attendance = await prisma.attendance.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAttendance = async (req, res) => {
    try {
        const { userId, date, time, status } = req.body;
        const Attendance = await prisma.attendance.create({
            data: {
                user: {
                    connect: { id: userId }
                },
                date: new Date(date),
                time,
                status,
            },
        });
        res.status(201).json({
            message: "attendance berhasil dibuat",
            Attendance,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const updateAttendance = async (req, res) => {
    const {date, time, status} = req.body
    try {
        const attendance = await prisma.attendance.update({
            where: { id: parseInt(req.params.id) },
            data: {
                date: new Date(date),
                time,
                status,
            },
        });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAttendance = async (req, res) => {
    try {
        const attendance = await prisma.attendance.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};