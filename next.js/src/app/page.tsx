'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import MyTasks from '@/components/auth/MyTasks';
import { User } from '@prisma/client';
import PageTitle from '@/components/format/PageTitle';

const LandingContent = () => {
  const { setIsAuthOpen } = useContext(AuthContext);

  return <>
    {/* Hero Section */}
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Organize
          </span>{' '}
          <span className="text-blue-900">Your Work and Life, Finally.</span>
        </h1>
        <p className="text-xl text-blue-900 mb-8 max-w-2xl mx-auto leading-relaxed">
          TaskFlow helps you manage your tasks, collaborate with others, and stay productive.
          The simple way to keep track of everything you need to do.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Get Started - It's Free
        </button>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskFlow?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Simple Task Management</h3>
            <p className="text-gray-800">Create, organize, and track your tasks with ease. Never forget important deadlines again.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Time Tracking</h3>
            <p className="text-gray-800">Track time spent on tasks and improve your productivity with detailed insights.</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Team Collaboration</h3>
            <p className="text-gray-800">Work together with your team, share tasks, and stay in sync with everyone.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="bg-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">Ready to Get Started?</h2>
        <p className="text-blue-900 text-lg mb-8">
          Join thousands of users who are already managing their tasks more effectively with TaskFlow.
        </p>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Create Free Account
        </button>
      </div>
    </section>
  </>;
  };


export default function Home() {
  const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetch('/api/auth/me')
			.then(res => res.json())
			.then(user => {
				if (user) {
					setUser(user);
				}
			})
			.catch(console.error);
	}, []);

  return (
    <main>
      {user
        ? <>
          <br/>
          <PageTitle>My Tasks</PageTitle>
          <MyTasks />
        </>
        : <LandingContent />
      }
    </main>
  );
}