import ProductItem from './ProductItem';

function ProductList() {
  return (
    <div className="flex flex-row items-center ">
      <div className="w-[200px] h-[700px]">
        <p className="bg-red-200 w-[700px] -left-[250px] top-[250px] -rotate-90 relative  h-[200px] text-[40px] ">
          Lorem Ipsum is simply dummy text of the printing and tyunce with
          righteous indignation and dislike men who are so beguiled and
        </p>
      </div>
      <ProductItem />
      <span className="font-Sanchez text-[200px] overflow-hidden">
        LUMIÉRE <br />
        DE LAUBE
      </span>
    </div>
  );
}

export default ProductList;
