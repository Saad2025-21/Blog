import React from 'react';

const About = () => {
  return (
    <main className="editorial-about min-h-screen px-4 md:px-0 mb-7">
      <div className="about-inner max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="about-heading text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold  mb-4">
            About Our NatBlog
          </h1>
          <p className="text-lg ">
            A place to share thoughts, inspire others, and grow together.
          </p>
        </header>

        {/* Image + Text Section */}
        <section className="about-copy mt-12 grid md:grid-cols-2 gap-10 items-center">
          {/* <img
            src={aboutImg}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          /> */}
          <div>
            <p className=" text-lg mb-4">
              Welcome to our Blog App! We created this platform for readers,
              writers, and thinkers to connect through stories, tutorials, and
              creative insights. Whether you're a passionate about nature or someone
              who loves exploring, this space is built for you.
            </p>
            <p className=" text-lg mb-4">
              Our mission is to empower individuals to share insights on nature.
              We offer simple tools to write, publish, and engage with others in
              this mini environment.
            </p>
            <p className=" text-lg">
              Thank you for being a part of our nature community.
            </p>
          </div>
        </section>

        {/* Footer Quote */}
        <div className="about-quote mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500">
            "Words are powerful. Use them to conserve."
          </blockquote>
        </div>
      </div>
    </main>
  );
};

export default About;