import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import aboutImage from "../about-image.jpg";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react"

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'author']{
            name,
            bio,
            'authorImage': image.asset->url
        }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <div>Loading...</div>;
  return (
    <main className="relative">
      <img
        src={aboutImage}
        alt="man facing three monitors"
        className="absolute w-screen h-screen"
      />
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
          <img
            src={urlFor(author.authorImage).url()}
            className="rounded w-60 mx-auto h-30 lg:w-64 lg:h-64 mb-8"
            alt={author.name}
          />
          <div className="text-lg flex flex-col justify-center">
            <h1 className="sans-serif text-6xl text-red-200 mb-4  ml-5">
              Hey there. I'm{" "}
              <span className="text-blue-300">{author.name}</span>
            </h1>
            <div className="prose lg:prose-xl text-white ml-5">
              <BlockContent
                blocks={author.bio}
                projectId="sn9xerha"
                dataset="production"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
