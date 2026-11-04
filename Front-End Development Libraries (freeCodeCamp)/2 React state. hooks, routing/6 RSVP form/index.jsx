
const { useState } = React;

export function EventRSVPForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attendees, setAttendees] = useState(1);
  const [dietary, setDietary] = useState('');
  const [additionalGuests, setAdditionalGuests] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <h1>Event RSVP</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Number of attendees:
          <input
            type="number"
            min="1"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
            required
          />
        </label>

        <label>
          Dietary preferences:
          <input
            type="text"
            placeholder="Dietary preferences (optional)"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
          />
        </label>

        <label>
          Bringing additional guests?
          <input
            type="checkbox"
            checked={additionalGuests}
            onChange={(e) => setAdditionalGuests(e.target.checked)}
          />
        </label>

        <button type="submit">Submit RSVP</button>
      </form>

      {submitted && (
        <div>
          <h2>RSVP Submitted!</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Number of attendees: {attendees}</p>
          <p>Dietary preferences: {dietary || 'None'}</p>
          <p>
            Bringing additional guests: {additionalGuests ? 'Yes' : 'No'}
          </p>
        </div>
      )}
    </>
  );
}
