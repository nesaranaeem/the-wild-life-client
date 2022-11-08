import React from "react";

const SubmittedServices = ({ service }) => {
  return (
    <tr>
      <td class="bg-white px-4 py-2">
        <label class="sr-only" for="Row1">
          Row 1
        </label>

        <input
          class="h-5 w-5 rounded border-gray-200"
          type="checkbox"
          id="Row1"
          disabled
        />
      </td>
      <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {service.serviceName}
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-gray-700">
        {service.photo.slice(0, 30)}...
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-gray-700">
        {service.description.slice(0, 40)}...
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-gray-700">
        $ {service.startingPrice}
      </td>
    </tr>
  );
};

export default SubmittedServices;
