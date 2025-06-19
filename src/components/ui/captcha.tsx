
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const verified = userInput.toLowerCase() === captchaText.toLowerCase();
    setIsVerified(verified);
    onVerify(verified);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (isVerified) {
      setIsVerified(false);
      onVerify(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 px-4 py-2 rounded border font-mono text-lg tracking-wider select-none">
          {captchaText}
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={generateCaptcha}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter CAPTCHA"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button 
          type="button" 
          onClick={handleVerify}
          variant={isVerified ? "default" : "outline"}
          disabled={!userInput}
        >
          {isVerified ? "✓ Verified" : "Verify"}
        </Button>
      </div>
      
      {isVerified && (
        <p className="text-sm text-green-600">✓ CAPTCHA verified successfully</p>
      )}
    </div>
  );
};

export default Captcha;
