import Link from "next/link";

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/faqs`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data");
  }
  return res.json();
}

export default async function Page() {
  const { result: faqs } = await getData();

  return (
    <>
      <div className="container mt-14 mx-auto px-4">
        <div className="p-8">
          <h1 className="text-md md:text-xl font-bold mb-4">سوالات متداول</h1>
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4 border p-4 rounded-3xl">
              <h4 className="text-lg font-bold text-primary mb-2">
                {faq.question}
              </h4>
              <p className="text-sm">
                {faq.answer}
              </p>
            </div>
          ))}


        </div>
      </div>
    </>
  );
}