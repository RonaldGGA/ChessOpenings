# ♟️ ChessMaster

<div align="center">

**Your personal chess coach that actually gets how you learn** 🧠

*Built by a developer who's as passionate about chess as he is about clean code*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://postgresql.org/)

[![Live Demo](https://img.shields.io/badge/🚀_Try_It_Out-Click_Here-10B981?style=for-the-badge)](https://chess-openings-indol.vercel.app)
[![GitHub](https://img.shields.io/badge/⭐_Star_Me-If_You_Like_It-yellow?style=for-the-badge)](https://github.com/RonaldGGA/ChessMaster)

</div>

## 🤔 What's the Deal with ChessMaster?

Look, I built this because I was tired of chess apps that feel like reading a textbook. You know the ones - they show you moves but don't actually help you *remember* them.

ChessMaster is different. It's like having a chess buddy who:

- 🎯 **Goes directly to the point, no distractions**
- 🧠 **Makes opening practice feel like a game, not homework**  
- 📱 **Works perfectly whether you're on your phone or computer**
- 💾 **Keeps track of your actions automatically**

### Here's What You Get:

| Feature | Why It's Cool |
|---------|---------------|
| 🎮 **Interactive Practice** | Get instant feedback on your moves - no more guessing |
| 🧠 **Smart Opening Database** | 1,000+ openings that actually make sense to learn |
| 📊 **Progress Tracking** | Watch yourself actually improve over time, as you become more accurate and learn new openings |
| 📱 **Mobile Friendly** | Practice openings while waiting in line somewhere |


> 🎯 **Real Talk**: I built this for myself originally. I was tired of forgetting openings I practiced last week. Now I don't have to - and neither do you!

---

## 🛠 What's Under the Hood?

<div align="center">

### Frontend - The Pretty Part
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![React Chessboard](https://img.shields.io/badge/React_Chessboard-2.0-61DAFB?style=flat-square&logo=react)

### Backend - The Brain Part  
![Next.js API](https://img.shields.io/badge/Next.js_API_Routes-14-000000?style=flat-square&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)

</div>

---

## 🚀 Let's Get This Running!

Seriously, it takes like 5 minutes:

```bash
# 1. Grab the code
git clone https://github.com/RonaldGGA/ChessMaster.git
cd chessmaster

# 2. Install the good stuff
npm install

# 3. Set up your environment (don't worry, it's easy)
cp .env.example .env.local
# ^ Just fill in your database info here

# 4. Get the database ready
npx prisma generate
npx prisma db push

# 5. You're ready to roll! 🎉
npm run dev
```

Then just open [http://localhost:3000](http://localhost:3000) and start practicing!

---

## 🤝 Want to Help Make This Better?

Found a bug? Have a cool idea? I'm all ears! 

- 🐛 **Found an issue?** [Open a ticket](https://github.com/RonaldGGA/ChessMaster/issues)
- 💡 **Got a feature idea?** I'd love to hear it!
- 🌟 **Like what you see?** Star the repo - it makes my day 😊

---

## 📝 The Techy Details (For My Fellow Devs)

This is built with:
- **Next.js 14** with App Router (because pages are so 2022)
- **TypeScript** (for those sweet, sweet type safety feels)
- **Tailwind CSS** (utility-first CSS that doesn't make me cry)
- **Prisma + PostgreSQL** (database stuff that actually makes sense)
- **React Chessboard** (for the smooth chess moves)

---

I have 2 errors I would want to solve:
1- When you translate the page and search for an Opening, an error pops up, I don't know how to fix it
2- When you redirect from dashboard to sign-in (protected route) the background crashes for miliseconds
If you have any idea why this happens, feel free to reach me out, I am open to learn.

<div align="center">

**Ready to stop forgetting your openings?** 

[![Try It Now](https://img.shields.io/badge/🎯_Try_ChessMaster_Now-Click_Here-10B981?style=for-the-badge&logo=chess)](https://chess-openings-indol.vercel.app)

*No signup required - just start playing!*

</div>
```
