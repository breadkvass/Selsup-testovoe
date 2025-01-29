import React from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Record<number, string>;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const paramValues: Record<number, string> = {};

    props.model.paramValues.forEach((paramValue) => {
      paramValues[paramValue.paramId] = paramValue.value;
    });

    this.state = {
      paramValues,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  public getModel(): Model {
    const { paramValues } = this.state;

    return {
      paramValues: Object.entries(paramValues).map(([paramId, value]) => ({
        paramId: Number(paramId),
        value,
      })),
      colors: this.props.model.colors || [], // если модель будет расширена параметром цвета
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div style={{border: "1px solid white", padding: 12, borderRadius: 16}}>
        {params.map((param) => (
          <div key={param.id} style={{ marginBottom: "10px" }}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ""}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => console.log(this.getModel())}>
          Получить модель
        </button>
      </div>
    );
  }
}


function App() {
  
  const params = [
    {
      "id": 1,
      "name": "Назначение"
    },
    {
      "id": 2,
      "name": "Длина"
    }
  ]

  const model = {
    "paramValues": [
      {
        "paramId": 1,
        "value": "повседневное"
      },
      {
        "paramId": 2,
        "value": "макси"
      }
    ]
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <a style={{marginBottom: 20}} href="https://disk.yandex.ru/d/KypAigPWsC7dSQ">Ссылка на решение одним файлом</a>
      <a style={{marginBottom: 40}} href="https://github.com/breadkvass/Selsup-testovoe">Ссылка на репозиторий</a>
      <ParamEditor params={params} model={model}/>
    </div>
  )
}

export default App;
