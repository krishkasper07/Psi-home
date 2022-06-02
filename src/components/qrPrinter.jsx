import React from "react";
import QRCode from "react-qr-code";
const QrPrinter = React.forwardRef(({ order, dark }, ref) => {
  return (
    <div className=" mt-4 flex justify-center items-center flex-col w-full">
      <div
        className={`mt-4 flex  flex-col h-[75vh] w-80 md:w-[40rem] ${
          dark ? "shadow-emerald-600" : "shadow-blue-800"
        } rounded-md shadow-md`}
      >
        {order.map((el, index) => {
          return <QrCodes key={index} order={el} ref={ref} dark={dark} />;
        })}
      </div>
    </div>
  );
});

export default QrPrinter;

export const QrCodes = React.forwardRef(({ order, dark }, ref) => {
  const items = order.line_items;
  const orderNumber = order.order_number;
  const Qr = items.map((product) => {
    let stars = [];
    for (let i = 0; i < product.quantity; i++) {
      stars.push(
        <div
          key={i}
          className={`text-center ${
            dark ? "bg-white" : ""
          } flex flex-col items-center shadow-lg rounded-lg border p-2 my-2 w-[148px]`}
        >
          <QRCode
            value={`${orderNumber}-${product.name}-${product.quantity - i}`}
            size={60}
            className="bg-cyan-500 shadow-lg shadow-slate-400"
          />
          <div style={{ fontSize: "9.5px", padding: "5px" }}>{`${orderNumber}-${
            product.name
          }-${product.quantity - i}`}</div>
        </div>
      );
    }
    return stars;
  });
  return (
    <div ref={ref}>
      <div className="text-lg text-center mt-4">{`Order-Number-${orderNumber}`}</div>
      <div className="grid grid-cols-3 gap-2 justify-items-center">{Qr}</div>
    </div>
  );
});
