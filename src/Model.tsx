import React from "react";

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[]; // Оставлено для будущего расширения
}

interface Color {
  // Заглушка для структуры цветов
  id: number;
  name: string;
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: Record<number, string>; // Объект, где ключ - paramId, значение - value
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Преобразуем paramValues из модели в удобную структуру состояния
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
      colors: this.props.model.colors || [], // Поддержка цветов
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
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

export default ParamEditor;
// Описание решения:
// Состояние (State)

// Используется paramValues: Record<number, string>, где ключ – id параметра, а значение – его value.
// Это обеспечивает удобный доступ к значениям без необходимости поиска по массиву.
// Метод getModel()