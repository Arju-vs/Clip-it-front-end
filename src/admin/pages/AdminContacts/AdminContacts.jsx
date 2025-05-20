import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner, Button, Modal, Form, Badge } from "react-bootstrap";
import { adminGetContactus, adminReplyToMessage } from "../../../../services/allAPI";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

      const fetchMessages = async () => {
      try {
        const res = await adminGetContactus()
        setMessages(res.data);
      } catch (err) {
        setError("Unauthorized! Please log in as an admin.");
      }
      setLoading(false);
    };

  const handleReplyClick = (id, email, subject) => {
    setSelectedMessageId(id);
    setSelectedEmail(email);
    setSelectedSubject(subject);
    setReplySubject(`Reply: ${subject}`);
    setShowReplyModal(true);
  };

const handleSendReply = async () => {
  if (!replySubject.trim() || !replyMessage.trim()) {
    alert("Please enter a subject and message.");
    return;
  }

  const reqBody = {
    messageId: selectedMessageId,
    email: selectedEmail,
    subject: replySubject,
    message: replyMessage,
  };

  try {
    const res = await adminReplyToMessage(reqBody);
    console.log(res.data);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === selectedMessageId ? { ...msg, status: "Replied" } : msg
      )
    );

    alert("Reply sent successfully!");
    setShowReplyModal(false);
    setReplySubject("");
    setReplyMessage("");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to send reply. Try again.");
  }
};

  

  return (
    <Container className="mt-4">
      <h2>Contact Messages</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && messages.length === 0 && <Alert variant="info">No messages found.</Alert>}

      {messages.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Received At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg._id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>
                  {msg.status === "Replied" ? (
                    <Badge bg="success">Replied</Badge>
                  ) : (
                    <Badge bg="danger">Not Replied</Badge>
                  )}
                </td>
                <td>
  {msg.status !== "Replied" && (
    <Button variant="primary" onClick={() => handleReplyClick(msg._id, msg.email, msg.subject)}>
      Reply
    </Button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Reply Modal */}
      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to {selectedEmail}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminContacts;
