
const SubscribeCard = () => {
  return (
    <div className=" flex bg-primary-text mx-3  max-lg:mx-5 items-center  p-5 rounded-xl text-amber-50 flex-col gap-y-4">
        <h2 className="text-center  font-semibold text-4xl">Thoughts delivered. Fresh.</h2>
        <div className="flex gap-x-2">
            <input type="email" placeholder="Enter Your Email" className="bg-main rounded-md text-primary-text placeholder:text-neutral-500 px-4" />
            <button className="px-2 py-1 bg-accent font-semibold rounded-xl">Subscribe</button>
        </div>
        <h2 className="font-extralight font-body text-center">
We promise not to spam :)
        </h2>
        
    </div>
  )
}

export default SubscribeCard