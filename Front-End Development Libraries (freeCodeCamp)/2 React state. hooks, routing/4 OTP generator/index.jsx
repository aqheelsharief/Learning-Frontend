
const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef(null);

  // Generate a new OTP
  const generateOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000);

    setOtp(String(newOTP));
    setTimeLeft(5);
    setIsActive(true);
  };

  // Manage countdown
  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  // Stop countdown when it reaches zero
  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
    }
  }, [timeLeft, isActive]);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>

      <h2 id="otp-display">
        {otp || "Click 'Generate OTP' to get a code"}
      </h2>

      <p id="otp-timer" aria-live="polite">
        {otp && (
          isActive
            ? `Expires in: ${timeLeft} seconds`
            : "OTP expired. Click the button to generate a new OTP."
        )}
      </p>

      <button
        id="generate-otp-button"
        onClick={generateOTP}
        disabled={isActive}
      >
        Generate OTP
      </button>
    </div>
  );
};
