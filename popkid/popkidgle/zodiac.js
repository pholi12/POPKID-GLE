import config from '../../config.cjs';

const zodiac = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "zodiac") {
    await m.React('♈'); // React with Aries symbol
    
    if (!text) {
      const helpText = `*Zodiac Sign Finder*\n\nUsage: ${prefix}zodiac <month/day>\nExample: ${prefix}zodiac 3/21\n\nI'll tell you your zodiac sign based on the date!`;
      return sock.sendMessage(m.from, { text: helpText }, { quoted: m });
    }

    // Parse the input date (format: MM/DD)
    const dateParts = text.split('/');
    if (dateParts.length !== 2 || isNaN(dateParts[0]) || isNaN(dateParts[1])) {
      return sock.sendMessage(m.from, { text: "⚠️ Please use the format: month/day (e.g., 3/21)" }, { quoted: m });
    }

    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return sock.sendMessage(m.from, { text: "⚠️ Please enter a valid date (e.g., 3/21 or 11/30)" }, { quoted: m });
    }

    // Determine zodiac sign based on date ranges
    let sign = "";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = "Aries ♈";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = "Taurus ♉";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = "Gemini ♊";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = "Cancer ♋";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = "Leo ♌";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = "Virgo ♍";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = "Libra ♎";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = "Scorpio ♏";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = "Sagittarius ♐";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = "Capricorn ♑";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = "Aquarius ♒";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sign = "Pisces ♓";

    const response = `📅 Date: ${month}/${day}\n✨ Zodiac Sign: ${sign}\n\n*Traits:* ${getZodiacTraits(sign.split(' ')[0])}`;
    sock.sendMessage(m.from, { text: response }, { quoted: m });
  }
}

// Helper function to add some simple traits for each sign
function getZodiacTraits(sign) {
  const traits = {
    "Aries": "Energetic, Courageous, Determined",
    "Taurus": "Reliable, Patient, Practical",
    "Gemini": "Adaptable, Curious, Kind",
    "Cancer": "Loyal, Emotional, Sympathetic",
    "Leo": "Confident, Generous, Proud",
    "Virgo": "Analytical, Kind, Hardworking",
    "Libra": "Diplomatic, Social, Fair-minded",
    "Scorpio": "Passionate, Resourceful, Brave",
    "Sagittarius": "Generous, Idealistic, Humorous",
    "Capricorn": "Responsible, Disciplined, Self-controlled",
    "Aquarius": "Innovative, Humanitarian, Original",
    "Pisces": "Compassionate, Artistic, Intuitive"
  };
  return traits[sign] || "Unique and wonderful!";
}

export default zodiac;
