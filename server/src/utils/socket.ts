import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import logger from "./logger";

let io: SocketServer | null = null;

const userSocketMap = new Map<string, Set<string>>();

export function initializeSocket(httpServer: HttpServer) {
  io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId && userId !== "undefined") {
      if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, new Set());
      }
      userSocketMap.get(userId)!.add(socket.id);
      logger.debug(`User ${userId} connected via socket ${socket.id}`);
    }

    socket.on("disconnect", () => {
      if (userId && userSocketMap.has(userId)) {
        userSocketMap.get(userId)!.delete(socket.id);
        if (userSocketMap.get(userId)!.size === 0) {
          userSocketMap.delete(userId);
        }
      }
    });
  });

  logger.info("Socket.IO initialized");
  return io;
}

export function getIO(): SocketServer | null {
  return io;
}

export function emitToUser(userId: string, event: string, data: any) {
  if (!io) return;
  const socketIds = userSocketMap.get(userId);
  if (socketIds) {
    socketIds.forEach((socketId) => {
      io!.to(socketId).emit(event, data);
    });
  }
}
