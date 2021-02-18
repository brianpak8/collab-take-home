function Output(props) {
  return props.output.map((element, idx) => {
    return <div className="output" key={idx}>{element}</div>
  })
}

export default Output;
