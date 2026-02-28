import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase-config'; // 설정된 파이어베이스 파일

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // home, board, write, profile

  // 등급 아이콘 매핑
  const rankIcons = {
    아카시아: '🌸', 라벤더: '🪻', 로즈마리: '🌿', 
    유채: '🌼', 밤: '🌰', 두리안: '🍈', 클로버: '🍀'
  };

  return (
    <div className="min-h-screen bg-honey font-sans text-black">
      {!user ? (
        <LoginView onLogin={(u) => setUser(u)} />
      ) : (
        <>
          <Header />
          <main className="pb-20">
            {currentPage === 'home' && <HomeView user={user} />}
            {currentPage === 'board' && <BoardView user={user} />}
            {currentPage === 'write' && <WriteView user={user} />}
            {currentPage === 'profile' && <ProfileView user={user} onLogout={() => setUser(null)} />}
          </main>
          <NavBar setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
}

// 1. 로그인 화면
function LoginView({ onLogin }) {
  const [job, setJob] = useState('');
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">한꿀팁</h1>
      <div className="text-6xl mb-6">🍯</div>
      <input className="w-full p-3 mb-2 border-2 border-black rounded" placeholder="아이디" />
      <input className="w-full p-3 mb-4 border-2 border-black rounded" type="password" placeholder="패스워드" />
      <button className="w-full bg-black text-white p-3 rounded-xl font-bold mb-2">로그인하기</button>
      <button className="w-full border-2 border-black p-3 rounded-xl font-bold mb-6">회원가입하기</button>
      
      <p className="font-bold mb-2">당신의 직업을 선택하세요:</p>
      <select onChange={(e) => setJob(e.target.value)} className="w-full p-2 border-black border-2 rounded">
        <option>초등학생</option><option>직장인</option><option>은퇴 준비/후</option>
      </select>
      <p className="text-xs mt-2">당신의 직업에 따라 게시글이 추천됩니다.</p>
    </div>
  );
}

// 2. 홈 화면 (인기글 + 최신순)
function HomeView({ user }) {
  return (
    <div className="p-4">
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">🔥 인기 게시글</h2>
        <div className="bg-white rounded-lg p-4 shadow-md border-l-8 border-black">
            {/* 1~10위 리스트 맵핑 */}
            <p>1. 초보 주부를 위한 꿀팁 [👍120]</p>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">✨ 최신순</h2>
          <select className="bg-transparent border-b border-black text-sm">
            <option>대학생 ▼</option>
            <option>전체</option>
          </select>
        </div>
        <div className="space-y-3">
            <PostCard title="학점 잘 받는 법" author="꿀벌123" />
        </div>
      </section>
      
      {/* 도움말 버튼 */}
      <button className="fixed bottom-24 right-6 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-lg font-bold">?</button>
    </div>
  );
}

// 3. 네비게이션 바
function NavBar({ setCurrentPage }) {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t-2 border-black h-16 flex justify-around items-center">
      <button onClick={() => setCurrentPage('home')}>🏠 홈</button>
      <button onClick={() => setCurrentPage('board')}>📋 게시판</button>
      <button onClick={() => setCurrentPage('write')}>➕</button>
      <button onClick={() => setCurrentPage('sub')}>🔔 구독</button>
      <button onClick={() => setCurrentPage('profile')}>👤 정보</button>
    </nav>
  );
}

function PostCard({ title, author }) {
  return (
    <div className="bg-white p-4 rounded-xl border-2 border-black shadow-sm">
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="flex justify-between items-center mt-2 text-sm">
        <span>🌸 {author}</span>
        <button className="text-blue-600">구독</button>
      </div>
    </div>
  );
}

export default App;
