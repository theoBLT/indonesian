import React, { useState } from "react"

const PlanSection = props => {
  const [isChecked, setIsChecked] = useState("")

  const updatePlan = event => {
    event.preventDefault()
    switch (event.target.value) {
      case "starter":
        props.setPlan("price_1IKky0KMFPueLM0KeUT7DCK3")
        setIsChecked("starter")
        break
      case "supporter":
        props.setPlan("price_1IKkyOKMFPueLM0KfbR4ylY2")
        setIsChecked("supporter")
        break
      default:
        console.log("unknown option selected")
    }
  }

  return (
    <>
      <p>
        We will have a selection of 2-3 charities you can support. You can pick
        which one by hitting one of the options below.For now they've got
        placeholder names, such as "starter" or "supporter", which, granted,
        don't mean much. Still, please pretend with me and pick one.
      </p>

      <div>
        <input
          type="radio"
          id="starter"
          name="plan"
          value="starter"
          checked={isChecked === "starter" ? true : false}
          onChange={updatePlan}
        />
        <label htmlFor="starter">Starter — €5/month</label>
      </div>

      <div>
        <input
          type="radio"
          id="supporter"
          name="plan"
          value="supporter"
          checked={isChecked === "supporter" ? true : false}
          onChange={updatePlan}
        />
        <label htmlFor="supporter">Supporter plan — €10/month</label>
      </div>

      <br />
      <br />
    </>
  )
}

export default PlanSection
