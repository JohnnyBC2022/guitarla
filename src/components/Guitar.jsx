const Guitar = ({ guitar, addToCart }) => {
  const { id, name, image, description, price } = guitar;

  const handleClick = (guitar) => {};

  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="d-flex h-100 border rounded shadow bg-white">
        <div className="col-4 p-0">
          <img
            className="img-fluid h-100 object-fit-cover"
            src={`/img/${image}.jpg`}
            alt={`Imagen de la guitarra ${name}`}
          />
        </div>

        <div className="col-8 d-flex flex-column justify-between align-items-center p-3">
          <div className="mb-auto">
            <h3 className="text-black fs-5 fw-bold text-uppercase">{name}</h3>
            <p className="description-clamp text-muted mb-2">{description}</p>
            <p className="fw-bold text-primary fs-4">{price} €</p>
            <button
              type="button"
              className="btn btn-dark mt-auto w-100"
              onClick={() => addToCart(guitar)}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guitar;
