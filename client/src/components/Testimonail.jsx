import { assets } from "../assets/assets"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: "John Doe",
            title: "Marketing Director, TechCorp",
            content:
                "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
            rating: 4,
        },
        {
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: "Jane Smith",
            title: "Content Creator, TechCorp",
            content:
                "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
            rating: 5,
        },
        {
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: "David Lee",
            title: "Content Writer, TechCorp",
            content:
                "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
            rating: 4,
        },
    ]

    return (
        <div className="px-4 sm:px-20 xl:px-32 py-14">
            {/* Section Heading */}
            <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Loved by{" "}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        Creators
                    </span>
                </h2>
                <p className="mt-3 text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                    Don&apos;t just take our word for it. Here&apos;s what our users are
                    saying.
                </p>
            </div>

            {/* Testimonial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyTestimonialData.map((testimonial, index) => (
                    <div
                        key={index}
                        className="p-8 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    >
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-4">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <img
                                        key={i}
                                        src={
                                            i < testimonial.rating
                                                ? assets.star_icon
                                                : assets.star_dull_icon
                                        }
                                        className="w-5 h-5"
                                        alt="star"
                                    />
                                ))}
                        </div>

                        {/* Content */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                            “{testimonial.content}”
                        </p>

                        <hr className="mb-6 border-gray-200" />

                        {/* User */}
                        <div className="flex items-center gap-4">
                            <img
                                src={testimonial.image}
                                className="w-14 h-14 object-cover rounded-full border border-gray-200"
                                alt={testimonial.name}
                            />
                            <div className="text-sm">
                                <h3 className="font-semibold text-gray-800">
                                    {testimonial.name}
                                </h3>
                                <p className="text-xs text-gray-500">{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
