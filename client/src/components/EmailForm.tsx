import axios from "axios";
import { useState } from "react";

const EmailForm: React.FC<{ id: string }> = ({ id }) => {
  const [emails, setEmails] = useState({
    emailFrom: "",
    emailTo: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSetEmails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setEmails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "api/files/email",
        data: {
          id,
          emailFrom: emails.emailFrom,
          emailTo: emails.emailTo,
        },
      });
      setMessage(data.message);
      setIsSent(true);
    } catch (error) {
      setMessage(error.data.response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3">
      <h3>You can send a file through mail</h3>
      <form
        onSubmit={handleSendEmail}
        className="flex flex-col items-center justify-center w-full p-2 space-y-3"
      >
        <input
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          type="email"
          name="emailFrom"
          placeholder="Email From"
          value={emails.emailFrom}
          required
          onChange={handleSetEmails}
        />
        <input
          type="email"
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          name="emailTo"
          placeholder="Email To"
          value={emails.emailTo}
          onChange={handleSetEmails}
          required
        />
        <button className="button" type="submit" disabled={isSent}>
          Send Email
        </button>
      </form>
      {message && <p className="font-medium text-red-500">{message}</p>}
    </div>
  );
};

export default EmailForm;
