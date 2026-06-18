import { useContactController } from "../Controllers/ContactController";

const Contact = () => {
    const {
        viewModel,
        handleLinkedIn,
        handleGitHub,
        handleSubmit
    } = useContactController();

    return (
        <section className="min-h-screen bg-[#050505] py-24 px-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-5xl font-serif italic text-white mb-4">
                    {viewModel.title}
                </h1>

                <p className="text-white/50 mb-12">
                    {viewModel.subtitle}
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* CONTACT INFO */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">

                        <h2 className="text-orange-500 uppercase tracking-widest text-sm mb-6">
                            Contact Information
                        </h2>

                        <div className="space-y-4 text-white">
                            <p>📧 {viewModel.contactInfo.email}</p>
                            <p>📘 {viewModel.contactInfo.facebook}</p>
                            <p>📍 {viewModel.contactInfo.location}</p>
                        </div>

                        <div className="flex gap-3 mt-8 flex-wrap">

                            <button
                                onClick={handleLinkedIn}
                                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
                            >
                                LinkedIn
                            </button>

                            <button
                                onClick={handleGitHub}
                                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg"
                            >
                                GitHub
                            </button>

                        </div>
                    </div>

                    {/* CONTACT FORM */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg">

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="user_name"
                                placeholder="Your Name"
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white"
                                required
                            />

                            <input
                                type="email"
                                name="user_email"
                                placeholder="Your Email"
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white"
                                required
                            />

                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Your Message"
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-black py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;