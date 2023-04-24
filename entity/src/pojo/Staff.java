package pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 小叶子
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Staff {

  private String staffId;
  private String staffName;
  private String staffEmail;
  private String staffPassword;
  private String staffPosition;
  private String storeId;
  private long weekWorkHours;

}
