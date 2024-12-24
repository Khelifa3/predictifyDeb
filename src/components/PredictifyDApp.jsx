import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Progress } from "./ui/progress"
import { SpaceIcon as Alien, Rocket, Zap, DollarSign, Trophy, Clock, Wallet, Users, Sun, Moon, HelpCircle, ExternalLink } from 'lucide-react'

const connectWallet = async () => {
  console.log("Connecting wallet...")
}

const placeBet = async (prediction) => {
  console.log(`Placing bet: ${prediction}`)
}

const endRound = async () => {
  console.log("Ending round...")
}

const translations = {
  en: {
    title: "Predictify",
    round: "Round",
    prizePool: "Prize Pool",
    seed: "Seed",
    currentPrice: "Current Price",
    bettingTimeLeft: "Betting Time Left",
    timeSinceStart: "Time Since Start",
    previousWinner: "Previous Winner",
    walletInfo: "Wallet Information",
    address: "Address",
    balance: "Balance",
    pendingWithdrawal: "Pending Withdrawal",
    yourCurrentBet: "Your Current Bet",
    enterPrediction: "Enter your prediction",
    placeBet: "Bet 0.01 BNB",
    endRound: "End Round",
    connectWallet: "Connect Wallet",
    currentRoundBets: "Current Round Bets",
    howTo: "How to Play",
    viewContract: "View Contract on BscScan",
  },
  fr: {
    title: "Predictify",
    round: "Tour",
    prizePool: "Cagnotte",
    seed: "Graine",
    currentPrice: "Prix Actuel",
    bettingTimeLeft: "Temps Restant pour Parier",
    timeSinceStart: "Temps Écoulé",
    previousWinner: "Gagnant Précédent",
    walletInfo: "Informations du Portefeuille",
    address: "Adresse",
    balance: "Solde",
    pendingWithdrawal: "Retrait en Attente",
    yourCurrentBet: "Votre Pari Actuel",
    enterPrediction: "Entrez votre prédiction",
    placeBet: "Parier 0.01 BNB",
    endRound: "Terminer le Tour",
    connectWallet: "Connecter le Portefeuille",
    currentRoundBets: "Paris du Tour Actuel",
    howTo: "Comment Jouer",
    viewContract: "Voir le Contrat sur BscScan",
  },
  ar: {
    title: "بريديكتيفاي",
    round: "الجولة",
    prizePool: "مجموع الجائزة",
    seed: "البذرة",
    currentPrice: "السعر الحالي",
    bettingTimeLeft: "الوقت المتبقي للرهان",
    timeSinceStart: "الوقت منذ البداية",
    previousWinner: "الفائز السابق",
    walletInfo: "معلومات المحفظة",
    address: "العنوان",
    balance: "الرصيد",
    pendingWithdrawal: "السحب المعلق",
    yourCurrentBet: "رهانك الحالي",
    enterPrediction: "أدخل توقعك",
    placeBet: "رهان 0.01 BNB",
    endRound: "إنهاء الجولة",
    connectWallet: "ربط المحفظة",
    currentRoundBets: "رهانات الجولة الحالية",
    howTo: "كيفية اللعب",
    viewContract: "عرض العقد على BscScan",
  },
}

export default function PredictifyDApp() {
  const [walletAddress, setWalletAddress] = useState("")
  const [walletBalance, setWalletBalance] = useState("0")
  const [currentRound, setCurrentRound] = useState(1)
  const [prizePool, setPrizePool] = useState("100")
  const [seed, setSeed] = useState("0x1234...")
  const [currentPrice, setCurrentPrice] = useState("400")
  const [bettingTimeLeft, setBettingTimeLeft] = useState(300)
  const [timeSinceStart, setTimeSinceStart] = useState(0)
  const [previousWinner, setPreviousWinner] = useState({ address: "0xabcd...", amount: "5" })
  const [currentBets, setCurrentBets] = useState([
    { address: "0x1234...", price: "405" },
    { address: "0x5678...", price: "395" },
  ])
  const [pendingWithdrawal, setPendingWithdrawal] = useState("0")
  const [currentPrediction, setCurrentPrediction] = useState("")
  const [language, setLanguage] = useState("en")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setBettingTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      setTimeSinceStart((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 sm:mb-0">
            {t.title}
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md p-2"
            >
              <option value="en">🇬🇧 EN</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="ar">🇸🇦 AR</option>
            </select>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Alien className="mr-2" color="#60A5FA" /> {t.round}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Rocket className="mr-2 text-purple-400" color="#A78BFA" /> {t.round}</span>
                <span className="text-2xl font-bold text-purple-400">{currentRound}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Trophy className="mr-2 text-yellow-400" color="#FBBF24" /> {t.prizePool}</span>
                <span className="text-2xl font-bold text-yellow-400">{prizePool} BNB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Zap className="mr-2 text-green-400" color="#34D399" /> {t.seed}</span>
                <span className="text-sm text-green-400">{seed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><DollarSign className="mr-2 text-cyan-400" color="#22D3EE" /> {t.currentPrice}</span>
                <span className="text-2xl font-bold text-cyan-400">${currentPrice}</span>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="flex items-center"><Clock className="mr-2 text-orange-400" color="#FB923C" /> {t.bettingTimeLeft}</span>
                  <span className="text-orange-400">{formatTime(bettingTimeLeft)}</span>
                </div>
                <Progress value={(bettingTimeLeft / 300) * 100} className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="flex items-center"><Clock className="mr-2 text-pink-400" color="#F472B6" /> {t.timeSinceStart}</span>
                  <span className="text-pink-400">{formatTime(timeSinceStart)}</span>
                </div>
                <Progress value={(timeSinceStart / 600) * 100} className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center"><Trophy className="mr-2 text-yellow-400" color="#FBBF24" /> {t.previousWinner}</span>
                <span className="text-yellow-400">{previousWinner.address} ({previousWinner.amount} BNB)</span>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Wallet className="mr-2" color="#60A5FA" /> {t.walletInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {walletAddress ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400">{t.address}</span>
                    <span className="text-purple-400">{walletAddress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400">{t.balance}</span>
                    <span className="text-yellow-400">{walletBalance} BNB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400">{t.pendingWithdrawal}</span>
                    <span className="text-green-400">{pendingWithdrawal} BNB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400">{t.yourCurrentBet}</span>
                    <span className="text-cyan-400">{currentPrediction || "Not set"}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Input
                      type="number"
                      placeholder={t.enterPrediction}
                      className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} text-inherit`}
                      value={currentPrediction}
                      onChange={(e) => setCurrentPrediction(e.target.value)}
                    />
                    <Button onClick={() => placeBet(currentPrediction)} className="bg-blue-600 hover:bg-blue-700">
                      {t.placeBet}
                    </Button>
                  </div>
                  <Button onClick={endRound} variant="secondary" className="w-full bg-purple-600 hover:bg-purple-700 mt-2">
                    {t.endRound}
                  </Button>
                </>
              ) : (
                <Button onClick={connectWallet} className="w-full bg-green-600 hover:bg-green-700">
                  {t.connectWallet}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-400">
              <Users className="mr-2" color="#60A5FA" /> {t.currentRoundBets}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentBets.map((bet, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg`}>
                  <div className="text-purple-400 truncate">{bet.address}</div>
                  <div className="text-cyan-400 font-bold">${bet.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="text-blue-600 dark:text-blue-400" />
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">{t.howTo}</a>
            </div>
            <div className="flex items-center space-x-2">
              <ExternalLink className="text-blue-600 dark:text-blue-400" />
              <a href="https://bscscan.com/address/YOUR_CONTRACT_ADDRESS" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                {t.viewContract}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}



