import React from "react"
import bookimage from "../images/the_book_of_jakarta.jpg"

const Product = () => {
  return (
    <>
      <div>
        <img src={bookimage} alt="The book of Jakarta" width="255" />
      </div>
      2<h2>The Book of Jakarta: A City in Short Fiction</h2>
      <p>
        <strong>Ratri Ninditya</strong>
      </p>
      <p>
        <strong>£10.00</strong>
      </p>
      <p>
        <p>
          A young woman takes a driverless taxi through the streets of Jakarta,
          only to discover that the destination she is hurtling towards is now
          entirely submerged...{" "}
        </p>
        <p>
          A group of elderly women visit a famous amusement park for one last
          ride, but things don’t go quite according to plan...
        </p>
        <p>
          The day before her wedding, a bride risks everything to meet her
          former lover at their favourite seafood restaurant on the other side
          of the tracks...{" "}
        </p>
        <p>
          Despite being the world’s fourth-largest nation – made up of over
          17,000 islands – very little of Indonesian history and contemporary
          politics are known to outsiders. From feudal states and sultanates to
          a Cold War killing field and a now struggling, flawed democracy – the
          country’s political history, as well as its literature, defies easy
          explanation. Like Indonesia itself, the capital city Jakarta is a
          multiplicity; irreducible, unpredictable and full of surprises.
          Traversing the different neighbourhoods and districts, the stories
          gathered here attempt to capture the essence of contemporary Jakarta
          and its writing, as well as the ever-changing landscape of the
          fastest-sinking city in the world
        </p>
      </p>
    </>
  )
}

export default Product
