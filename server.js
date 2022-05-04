const io = require("socket.io")(5000, {
	cors: {
		origin: "http://localhost:3000",
	},
});
io.on("connection", (socket) => {
	const id = socket.handshake.query.id; //get id
	socket.join(id);
	socket.on("send-message", ({ recipients, text }) => {
		recipients.forEach((recipient) => {
			const newRecipient = recipients.filter((r) => r !== recipient);
			newRecipient.push(id);
			socket.broadcast.to(recipient).emit("receive-message", {
				recipients: newRecipient,
				sender: id,
				text,
			});
		});
	});
});
