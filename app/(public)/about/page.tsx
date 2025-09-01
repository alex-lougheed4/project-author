import Link from "next/link";

export default async function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            About Project Author
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collaborative platform where writers come together to share ideas,
            create stories, and inspire each other's creativity.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Purpose Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Our Purpose
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Project Author bridges the gap between writers with
                    brilliant ideas and writers seeking inspiration. We believe
                    that great stories come from the collaboration of minds.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-violet-300 mb-2">
                        Have Ideas? Share Them!
                      </h3>
                      <p className="text-sm">
                        If you have amazing story concepts but don't feel you
                        can do them justice, share them as prompts and watch
                        other writers bring them to life.
                      </p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        Need Inspiration? Write!
                      </h3>
                      <p className="text-sm">
                        If you love to write but need fresh ideas, browse our
                        prompts and let your creativity run wild with new story
                        concepts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Create or Browse
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Share your story prompts or discover new ideas from other
                      writers
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Write Stories
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Transform prompts into compelling stories and share your
                      creativity
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Vote & Engage
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Support your favorite prompts and stories with upvotes and
                      feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Community Driven
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Our platform thrives on community interaction. Every prompt
                    and story can be voted on, helping the best content rise to
                    the top and inspiring more writers to participate.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-4 py-2">
                      <span className="text-green-400">👍</span>
                      <span className="text-sm">Upvote Great Content</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-4 py-2">
                      <span className="text-red-400">👎</span>
                      <span className="text-sm">Provide Feedback</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-4 py-2">
                      <span className="text-blue-400">💬</span>
                      <span className="text-sm">Engage with Writers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-violet-400 mt-1">📝</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Prompt Creation
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Share your story ideas with detailed prompts and word
                          count targets
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-400 mt-1">📚</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Story Writing
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Transform prompts into full stories with word count
                          tracking
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">⏰</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Deadlines
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Set optional deadlines to create urgency and
                          motivation
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">🏆</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Voting System
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Upvote and downvote content to help the community find
                          the best work
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-pink-400 mt-1">👤</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          User Profiles
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Track your contributions and see your writing
                          statistics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 mt-1">🔍</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Discovery
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Explore trending prompts and stories from the
                          community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-2xl p-8 border border-violet-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of writers and start sharing your ideas or
              discovering new inspiration today. Whether you're a seasoned
              author or just starting out, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Create Your First Prompt
              </Link>
              <Link
                href="/explore"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 border border-slate-600"
              >
                Explore Prompts
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
