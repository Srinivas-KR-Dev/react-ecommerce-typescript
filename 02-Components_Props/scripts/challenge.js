function ProductDetails({ name, price, discountedPrice, imageSrc }) {

   /*  if(discountedPrice) {
    return(
        <article>
            <h3>{name}</h3>
            <p>Price: ${price}</p>
            <p>Discount price: ${discountedPrice}</p>
            <button>Add to Cart</button>
        </article>
    ); 
}*/


/*     return(
        <article> 
            <h3>{name}</h3>
            {!discountedPrice && (
                <p>Price: ${price}</p>
            )}
            {discountedPrice && (
                <p><del>Price: ${price}</del></p>
            )}
            {discountedPrice && (
                <p>Discount price: ${discountedPrice}</p>
            )}
            {
              // There are several solutions to this exercise.
              // As long as you get the final result, you're good!

              // Another solution is combine the 2 <p> above using a Fragment:
              // {discountPrice && (
              //   <>
              //     <p><del>Price: ${price}</del></p>
              //     <p>Discount price: ${discountPrice}</p>
              //   </>
              // )}
            }
            
            <button>Add to Cart</button>
        </article>
    );
} */

    //using ternary operator
    return(
        <article> 
            <h3>{name}</h3>

            <img src={imageSrc} width="100" height="100" />
            
            {(discountedPrice) ? (
            <>
                
                <p><del>Price: ${price}</del></p>
                <p>Discount price: ${discountedPrice}</p>
                
            </> 
             ) : (
            <>
                <p>Price: ${price}</p> 
            </>
            )}
            
            <button>Add to Cart</button>
        </article>
    );
}


function App() {
    return(
        <>
            <ProductDetails 
                name="Cotton socks" 
                price="10.90"
                discountedPrice="5.45"
                imageSrc = "images/cotton-socks.png"        
            />
            <ProductDetails 
                name="Tennis balls" 
                price="6.00"
                imageSrc = "images/tennis-balls.png"
            />
            <ProductDetails 
                name="Plain T-Shirt" 
                price="7.99"
                imageSrc = "images/plain-t-shirt.png"
            />
        </>
    );
}



const container = document.querySelector('.js-container');

ReactDOM.createRoot(container).render(<App />);