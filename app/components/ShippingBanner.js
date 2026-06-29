export function ShippingBanner() {
  return (
    <div className='w-full bg-secondary text-white border-b border-white/20'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 h-10 flex items-center justify-center'>
        <p className='text-sm font-semibold tracking-tight text-center'>
          Free shipping on orders{" "}
          <span className='underline underline-offset-2'>over $50</span> •
          Fresh-pressed daily • Delivered fast
        </p>
      </div>
    </div>
  );
}
