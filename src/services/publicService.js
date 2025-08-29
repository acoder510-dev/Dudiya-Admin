import CreateRepo from "../repo/createRepo.js";
import FindRepo from "../repo/findRepo.js";
import UpdateRepo from "../repo/updateRepo.js";
import { Messages } from "../utils/messages.js";

class PublicService {
  async getEduction(querys, item, skip, search) {
    try {
      const finalQuery = search
        ? {
            ...querys,
            name: { $regex: search, $options: "i" },
            status: { $ne: "isDeleted" },
          }
        : { status: { $ne: "isDeleted" } };

      const [result, count = 0] = await Promise.all([
        new FindRepo("EducationType").FindAll(
          finalQuery,
          {},
          Number(item),
          Number(skip)
        ),
        new FindRepo("EducationType").findCount(finalQuery),
      ]);

      return {
        status: process.env.SUCCESS,
        data: result,
        count: count,
        pages: Math.ceil(count / Number(item)),
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getLocation(item, skip, search) {
    try {
      const finalQuery = search
        ? {
            name: { $regex: search, $options: "i" },
            status: { $ne: "isDeleted" },
          }
        : { status: { $ne: "isDeleted" } };

      const [result, count = 0] = await Promise.all([
        new FindRepo("Location").FindAll(
          finalQuery,
          {},
          Number(item),
          Number(skip)
        ),
        new FindRepo("Location").findCount(finalQuery),
      ]);

      return {
        status: process.env.SUCCESS,
        data: result,
        count: count,
        pages: Math.ceil(count / Number(item)),
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getStaticPages(key) {
    try {
      let result = await new FindRepo("StatickModel").FindAll({ key }, {});

      return {
        status: process.env.SUCCESS,
        data: result,
      };
    } catch (err) {
      return {
        status: process.env.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default PublicService;
